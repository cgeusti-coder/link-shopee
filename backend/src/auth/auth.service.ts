import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.module';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('E-mail já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Create a Tenant for the user (assuming 1 user per tenant for now)
        const tenant = await this.prisma.tenant.create({
            data: {
                name: `${dto.firstName}'s Workspace`,
                slug: dto.email.split('@')[0],
            },
        });

        // 15 days from now
        const trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 15);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                lastName: dto.lastName,
                role: 'ADMIN',
                tenantId: tenant.id,
                trialExpiresAt: trialExpiresAt,
                subscriptionStatus: 'TRIAL',
            },
        });

        return {
            message: 'Cadastro realizado com sucesso',
            userId: user.id,
            trialExpiresAt: user.trialExpiresAt,
        };
    }
}
