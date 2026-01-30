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
        try {
            const graphQLQuery = `
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
            `;
            const variables = { keyword: query };

            const response = await this.callShopeeGraphQL(graphQLQuery, variables, credentials);

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
            console.error('Shopee Search API failed:', error.message);
            // Fallback for demo
            return [
                {
                    externalId: 'shopee_demo_1',
                    name: `${query} (Link Demo)`,
                    price: 49.90,
                    currency: 'BRL',
                    imageUrl: 'https://cf.shopee.com.br/file/br-50009109-7b786c52a5c5f463c6d48378546b2e3e',
                    originalUrl: 'https://shopee.com.br/',
                    availability: true,
                    metadata: {}
                }
            ];
        }
    }

    async generateAffiliateLink(url: string, affiliateId: string, credentials?: any): Promise<string> {
        if (!credentials || !credentials.apiSecret) {
            return `https://shope.ee/m/link-gerado?aff_id=${affiliateId}`;
        }

        try {
            const query = `
                query($url: String!) {
                    getShortLink(url: $url) {
                        shortLink
                    }
                }
            `;
            const variables = { url };
            const response = await this.callShopeeGraphQL(query, variables, credentials);
            return response.data?.data?.getShortLink?.shortLink || `https://shope.ee/m/link-gerado?aff_id=${affiliateId}`;
        } catch (error) {
            return `https://shope.ee/m/link-gerado?aff_id=${affiliateId}`;
        }
    }

    private async callShopeeGraphQL(query: string, variables: any, credentials: any) {
        const appId = credentials.apiKey;
        const appKey = credentials.appKey || appId;
        const appSecret = credentials.apiSecret;
        const timestamp = Math.floor(Date.now() / 1000);

        const body = JSON.stringify({ query, variables });

        // Shopee Affiliate Signature: HMAC-SHA256(app_key + timestamp + body, secret)
        const signature = crypto
            .createHmac('sha256', appSecret)
            .update(appKey + timestamp + body)
            .digest('hex');

        return axios.post('https://open-api.affiliate.shopee.com.br/graphql',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `SHA256 ${appKey}:${timestamp}:${signature}`
                },
                timeout: 5000
            }
        );
    }

    detectMarketplace(url: string): boolean {
        return url.includes('shopee.com.br') || url.includes('shope.ee');
    }
}
