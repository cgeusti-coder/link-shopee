import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { SubscriptionGuard } from '../../auth/guards/subscription.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('integrations')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Post()
    create(@Body() dto: CreateIntegrationDto, @Req() req: any) {
        // Automatically inject tenantId from JWT
        return this.integrationsService.createOrUpdate({
            ...dto,
            tenantId: req.user.tenantId,
        });
    }

    @Get()
    findAll(@Req() req: any) {
        // Automatically filter by user's tenantId from JWT
        return this.integrationsService.findAll(req.user.tenantId);
    }

    @Get('health')
    health() {
        return { status: 'ok', timestamp: new Date().toISOString() };
    }

    @Post('validate')
    validate(@Body() dto: CreateIntegrationDto) {
        return this.integrationsService.validate(dto);
    }
}
