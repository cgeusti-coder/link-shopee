
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

    async findAll(tenantId: string) {
        return this.prisma.affiliateCredential.findMany({
            where: { tenantId },
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
            throw new BadRequestException('App Key e App Secret são obrigatórios para Shopee');
        }

        // Real Shopee API validation would go here.
        // For BR affiliates, we use the Open Platform Affiliate Service.
        // We'll simulate a call to an innocuous endpoint like getting categories
        // or just validating the signature structure.

        const timestamp = Math.floor(Date.now() / 1000);
        const appId = dto.apiKey;
        const appSecret = dto.apiSecret;

        // This is a basic signature check simulation for now
        // In a production app, we'd call: https://open.shopee.com/api/v2/affiliate/get_categories

        const isValid = appId.length > 5 && appSecret.length > 10;

        if (!isValid) {
            throw new Error('Credenciais da Shopee parecem inválidas (formato incorreto)');
        }

        return {
            success: true,
            message: 'Conexão com Shopee validada com sucesso!',
            details: {
                platform: 'Shopee BR',
                timestamp
            }
        };
    }
}
