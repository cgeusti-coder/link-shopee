export interface MarketplaceProduct {
    externalId: string;
    name: string;
    price: number;
    currency: string;
    imageUrl: string;
    originalUrl: string;
    affiliateUrl?: string;
    category?: string;
    availability: boolean;
    commissionRate?: number;
    metadata: Record<string, any>;
}

export interface IAffiliateMarketplaceConnector {
    marketplaceId: string;
    authenticate(credentials: any): Promise<boolean>;
    importProductByUrl(url: string): Promise<MarketplaceProduct>;
    generateAffiliateLink(url: string, affiliateId: string, subIds?: string[]): Promise<string>;
    detectMarketplace(url: string): boolean;
}
