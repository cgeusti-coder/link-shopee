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

    async processUrl(url: string, affiliateId: string): Promise<any> {
        const connector = this.connectors.find(c => c.detectMarketplace(url));
        if (!connector) {
            throw new NotFoundException('Marketplace not supported for this URL');
        }

        const product = await connector.importProductByUrl(url);
        const affiliateUrl = await connector.generateAffiliateLink(url, affiliateId);

        return {
            ...product,
            affiliateUrl,
        };
    }
}
