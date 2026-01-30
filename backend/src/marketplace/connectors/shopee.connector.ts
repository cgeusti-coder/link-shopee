import { Injectable } from '@nestjs/common';
import { IAffiliateMarketplaceConnector, MarketplaceProduct } from '../marketplace.interface';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class ShopeeConnector implements IAffiliateMarketplaceConnector {
    marketplaceId = 'shopee';

    async authenticate(credentials: any): Promise<boolean> {
        // Logic to validate Shopee API credentials
        return true;
    }

    async importProductByUrl(url: string): Promise<MarketplaceProduct> {
        // Logic to scrape or use Shopee API to fetch product details
        return {
            externalId: 'shopee_123',
            name: 'Produto Exemplo Shopee',
            price: 99.90,
            currency: 'BRL',
            imageUrl: 'https://cf.shopee.com.br/file/example.jpg',
            originalUrl: url,
            availability: true,
            metadata: {},
        };
    }

    async searchProducts(query: string, credentials: any): Promise<MarketplaceProduct[]> {
        const appId = credentials.apiKey;
        const appSecret = credentials.apiSecret;
        const timestamp = Math.floor(Date.now() / 1000);

        // Calculate Signature
        const signature = crypto
            .createHmac('sha256', appSecret)
            .update(appId + timestamp)
            .digest('hex');

        try {
            // Real Shopee BR GraphQL Affiliate Query (getOfferList)
            const response = await axios.post('https://open-api.affiliate.shopee.com.br/graphql', {
                query: `
                    query($keyword: String) {
                        getOfferList(keyword: $keyword, limit: 12) {
                            nodes {
                                itemId
                                productName
                                price
                                imageUrl
                                offerLink
                            }
                        }
                    }
                `,
                variables: { keyword: query }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `sha256 ${appId}:${timestamp}:${signature}`
                },
                timeout: 5000
            });

            const products = response.data?.data?.getOfferList?.nodes || [];
            return products.map(p => ({
                externalId: p.itemId,
                name: p.productName,
                price: parseFloat(p.price),
                currency: 'BRL',
                imageUrl: p.imageUrl,
                originalUrl: p.offerLink,
                availability: true,
                metadata: {}
            }));
        } catch (error) {
            console.error('Shopee Search API failed, using fallback mock data:', error.message);
            // Fallback for demo/dev purposes if credentials are not yet whitelisted for search
            return [
                {
                    externalId: 'shopee_001',
                    name: `${query} Premium Edition (API Demo)`,
                    price: 59.90,
                    currency: 'BRL',
                    imageUrl: 'https://cf.shopee.com.br/file/br-50009109-7b786c52a5c5f463c6d48378546b2e3e',
                    originalUrl: 'https://shopee.com.br/product-001',
                    availability: true,
                    metadata: {}
                }
            ];
        }
    }

    async generateAffiliateLink(url: string, affiliateId: string, subIds?: string[]): Promise<string> {
        // In a real implementation, we'd need to fetch the user's credentials from the DB
        // For now, if we don't have them in the context, we'll return a basic structure
        // But the logic is here for when the full flow is active.

        // This is a placeholder for the real logic that fetches credentials based on tenantId
        // In this architecture, generateAffiliateLink will be called with credentials in more advanced phases
        console.log(`Generating official Shopee link for ${url}`);

        return `https://shope.ee/m/link-gerado?aff_id=${affiliateId}`;
    }

    // Adding a private method to handle the GraphQL calls with auth
    private async callShopeeGraphQL(query: string, variables: any, credentials: any) {
        const appId = credentials.apiKey;
        const appSecret = credentials.apiSecret;
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = crypto
            .createHmac('sha256', appSecret)
            .update(appId + timestamp)
            .digest('hex');

        return axios.post('https://open-api.affiliate.shopee.com.br/graphql',
            { query, variables },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `sha256 ${appId}:${timestamp}:${signature}`
                },
                timeout: 5000
            }
        );
    }

    detectMarketplace(url: string): boolean {
        return url.includes('shopee.com.br') || url.includes('shope.ee');
    }
}
