import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-me',
        });
    }

    async validate(payload: any) {
        // Find user to ensure they still exist and are active
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                email: true,
                role: true,
                tenantId: true,
                subscriptionStatus: true,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado ou sessão inválida.');
        }

        return user; // This will be available as request.user
    }
}
