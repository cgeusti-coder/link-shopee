import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { ShopeeConnector } from './connectors/shopee.connector';

@Module({
    providers: [MarketplaceService, ShopeeConnector],
    exports: [MarketplaceService],
})
export class MarketplaceModule { }
