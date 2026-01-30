
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';

@Controller('integrations')
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Post()
    create(@Body() createIntegrationDto: CreateIntegrationDto) {
        // In a real app, tenantId would come from the JWT User
        // For now, we accept it in the body for testing
        return this.integrationsService.createOrUpdate(createIntegrationDto);
    }

    @Get()
    findAll(@Query('tenantId') tenantId: string) {
        return this.integrationsService.findAll(tenantId);
    }

    @Post('validate')
    validate(@Body() dto: CreateIntegrationDto) {
        return this.integrationsService.validate(dto);
    }
}
