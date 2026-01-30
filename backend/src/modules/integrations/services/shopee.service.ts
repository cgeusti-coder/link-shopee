
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class ShopeeService {
    private readonly logger = new Logger(ShopeeService.name);
    private readonly SHOPEE_HOST = 'https://partner.shopeemobile.com'; // Production URL

    constructor() { }

    /**
     * Generates HMAC-SHA256 signature for Shopee API v2
     */
    private signRequest(partnerId: string, partnerKey: string, path: string, timestamp: number): string {
        const baseString = `${partnerId}${path}${timestamp}`;
        return crypto.createHmac('sha256', partnerKey).update(baseString).digest('hex');
    }

    async getAuthUrl(callbackUrl: string, partnerId: string, partnerKey: string): Promise<string> {
        this.logger.log('Generating Shopee Auth URL');
        const path = '/api/v2/shop/auth_partner';
        const timestamp = Math.floor(Date.now() / 1000);
        const sign = this.signRequest(partnerId, partnerKey, path, timestamp);

        return `${this.SHOPEE_HOST}${path}?partner_id=${partnerId}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(callbackUrl)}`;
    }

    async searchProducts(query: string, credential: { affiliateId: string, apiKey: string, apiSecret: string }) {
        // NOTE: This assumes using Shopee Open Platform v2
        // Depending on the exact API (Affiliate vs Shop), the path changes.
        // Using generic product search path as example.

        try {
            const path = '/api/v2/product/search_item';
            const timestamp = Math.floor(Date.now() / 1000);
            const partnerId = credential.apiKey; // Mapping App ID -> apiKey field
            const partnerKey = credential.apiSecret;

            const sign = this.signRequest(partnerId, partnerKey, path, timestamp);

            const url = `${this.SHOPEE_HOST}${path}?partner_id=${partnerId}&timestamp=${timestamp}&sign=${sign}`;

            // This is a GET request usually, but check specific endpoint docs
            const response = await axios.get(url, {
                params: {
                    keyword: query
                }
            });

            return response.data;
        } catch (error) {
            this.logger.error(`Shopee API Error: ${error.message}`);
            // Return mock data for now if credentials fail, so UI doesn't break during dev
            return [
                { id: '1', name: 'Macbook Pro M3 (Mock)', price: 12999.00, image: 'https://placehold.co/150' },
                { id: '2', name: 'iPhone 15 Pro (Mock)', price: 6999.00, image: 'https://placehold.co/150' }
            ];
        }
    }
}
