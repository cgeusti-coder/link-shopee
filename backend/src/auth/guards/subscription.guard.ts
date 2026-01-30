import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return true;
        }

        // Master role bypasses subscription checks
        if (user.role === 'MASTER') return true;

        // Check if subscription is cancelled or expired
        if (user.subscriptionStatus === 'EXPIRED' || user.subscriptionStatus === 'CANCELLED') {
            throw new ForbiddenException('Sua assinatura expirou ou foi cancelada. Contrate um plano para continuar.');
        }

        return true;
    }
}
