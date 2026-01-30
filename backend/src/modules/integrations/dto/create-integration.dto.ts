
export class CreateIntegrationDto {
    platform: string; // 'SHOPEE' | 'AMAZON'
    affiliateId: string;
    apiKey?: string;
    apiSecret?: string;
    tenantId: string; // Temporary, will come from Auth later
}
