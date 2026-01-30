
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.module';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class IntegrationsService {
    private readonly logger = new Logger(IntegrationsService.name);

    constructor(private prisma: PrismaService) { }

    async createOrUpdate(dto: CreateIntegrationDto) {
        this.logger.log(`Creating/Updating integration for ${dto.platform}`);

        // Check if exists for this tenant and platform
        const existing = await this.prisma.affiliateCredential.findFirst({
            where: {
                tenantId: dto.tenantId,
                marketplace: dto.platform,
            }
        });

        if (existing) {
            return this.prisma.affiliateCredential.update({
                where: { id: existing.id },
                data: {
                    affiliateId: dto.affiliateId,
                    apiKey: dto.apiKey,
                    apiSecret: dto.apiSecret,
                }
            });
        }

        return this.prisma.affiliateCredential.create({
            data: {
                tenantId: dto.tenantId,
                marketplace: dto.platform,
                affiliateId: dto.affiliateId,
                apiKey: dto.apiKey,
                apiSecret: dto.apiSecret,
            }
        });
    }

    async validate(dto: CreateIntegrationDto) {
        this.logger.log(`Validating credentials for ${dto.platform}`);

        try {
            if (dto.platform === 'SHOPEE') {
                return await this.validateShopee(dto);
            }

            // For others, we'll implement real validation as we add their connectors
            // For now, if it's not implemented, we'll return a placeholder success
            // but log a warning.
            this.logger.warn(`Validation not yet implemented for ${dto.platform}`);
            return { success: true, message: 'Credenciais salvas (validação pendente)' };
        } catch (error) {
            this.logger.error(`Validation failed for ${dto.platform}: ${error.message}`);
            throw new BadRequestException(`Falha na validação: ${error.message}`);
        }
    }

    private async validateShopee(dto: CreateIntegrationDto) {
        if (!dto.apiKey || !dto.apiSecret) {
            throw new BadRequestException('AppID e API Secret (Senha) são obrigatórios para Shopee');
        }

        const appId = dto.apiKey;
        const appSecret = dto.apiSecret;
        const timestamp = Math.floor(Date.now() / 1000);

        // Shopee GraphQL API Signature logic: HMAC-SHA256(app_id + timestamp, secret)
        const baseString = appId + timestamp;
        const signature = crypto
            .createHmac('sha256', appSecret)
            .update(baseString)
            .digest('hex');

        try {
            // Official GraphQL Endpoint for Brazil
            const response = await axios.post('https://open-api.affiliate.shopee.com.br/graphql', {
                query: `query { getOfferList(limit: 1) { nodes { itemId } } }`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `sha256 ${appId}:${timestamp}:${signature}`
                },
                timeout: 10000
            });

            // GraphQL usually returns 200 even for logic/auth errors
            if (response.data?.errors && response.data.errors.length > 0) {
                const graphQLError = response.data.errors[0];
                this.logger.error(`Shopee GraphQL Error details: ${JSON.stringify(graphQLError)}`);

                // Specific check for code 10020 (Signature error)
                if (graphQLError.extensions?.code === 10020 || graphQLError.message?.includes('10020')) {
                    throw new Error('Erro de Assinatura (10020): Verifique se o AppID e a Senha estão corretos e sem espaços.');
                }

                throw new Error(graphQLError.message || 'Erro na API da Shopee');
            }

            return {
                success: true,
                message: 'Conexão com Shopee (GraphQL) validada com sucesso!',
                details: { appId, timestamp }
            };
        } catch (error: any) {
            this.logger.error(`Shopee Connection failed: ${error.message}`);

            if (error.response) {
                this.logger.error(`Response Data: ${JSON.stringify(error.response.data)}`);
            }

            // Expose the descriptive error to the frontend
            throw new BadRequestException(error.message || 'Falha na comunicação com a Shopee');
        }
    }

    async findAll(tenantId: string) {
        return this.prisma.affiliateCredential.findMany({
            where: { tenantId }
        });
    }
}
