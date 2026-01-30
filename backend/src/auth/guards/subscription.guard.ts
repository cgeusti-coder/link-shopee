import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.module';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // In a real app, the user ID would be extracted from the JWT token
        // For now, we take it from the query or a header for testing
        const userId = request.query.userId || request.headers['x-user-id'];

        if (!userId) {
            return true; // If no user (public), let other guards handle it
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                trialExpiresAt: true,
                subscriptionStatus: true,
            }
        });

        if (!user) return true;

        // Check if subscription is cancelled or expired
        if (user.subscriptionStatus === 'EXPIRED' || user.subscriptionStatus === 'CANCELLED') {
            throw new ForbiddenException('Sua assinatura expirou. Contrate um plano para continuar.');
        }

        // Check trial expiration
        if (user.subscriptionStatus === 'TRIAL' && user.trialExpiresAt) {
            if (new Date() > user.trialExpiresAt) {
                // Automatically update status to EXPIRED in database
                await this.prisma.user.update({
                    where: { id: userId },
                    data: { subscriptionStatus: 'EXPIRED' }
                });

                throw new ForbiddenException('Seu período de teste de 15 dias terminou. Contrate um plano para continuar.');
            }
        }

        return true;
    }
}
