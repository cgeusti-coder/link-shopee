
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.module';
import { CreateIntegrationDto } from './dto/create-integration.dto';

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
}
