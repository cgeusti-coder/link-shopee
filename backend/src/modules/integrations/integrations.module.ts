
import { Module } from '@nestjs/common';
import { ShopeeService } from './services/shopee.service';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

@Module({
    imports: [],
    controllers: [IntegrationsController],
    providers: [ShopeeService, IntegrationsService],
    exports: [ShopeeService, IntegrationsService],
})
export class IntegrationsModule { }
