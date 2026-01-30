
export class AffiliateIntegration {
    id: string;
    userId: string;
    platform: 'SHOPEE' | 'AMAZON';
    name: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    credentials: Record<string, any>; // Stores encrypted API keys/secrets
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
