
export class CreateIntegrationDto {
    platform: string; // 'SHOPEE' | 'AMAZON'
    affiliateId: string;
    apiKey?: string;
    apiSecret?: string;
    appKey?: string; // New field for Shopee App Key
    tenantId: string; // Temporary, will come from Auth later
}
