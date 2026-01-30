import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopeeConnector } from './connectors/shopee.connector';
import { IAffiliateMarketplaceConnector, MarketplaceProduct } from './marketplace.interface';

@Injectable()
export class MarketplaceService {
    private connectors: IAffiliateMarketplaceConnector[];

    constructor(
        private readonly shopeeConnector: ShopeeConnector,
    ) {
        this.connectors = [shopeeConnector];
    }

    async search(platformId: string, query: string, credentials: any): Promise<MarketplaceProduct[]> {
        const connector = this.connectors.find(c => c.marketplaceId === platformId.toLowerCase());
        if (!connector) {
            throw new NotFoundException(`Marketplace ${platformId} not supported`);
        }

        return connector.searchProducts(query, credentials);
    }
}
