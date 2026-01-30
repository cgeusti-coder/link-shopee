import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.module';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Este e-mail já está cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Check if this CPF has already used a trial
        const previousTrial = await this.prisma.user.findFirst({
            where: { document: dto.document },
        });

        // Create a Tenant for the user
        const tenant = await this.prisma.tenant.create({
            data: {
                name: `${dto.firstName} ${dto.lastName}'s Workspace`,
                slug: dto.email.split('@')[0],
            },
        });

        // 15 days trial expiration
        const trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 15);

        // Determine initial status (Trial or Expired if already used)
        const subscriptionStatus = previousTrial ? 'EXPIRED' : 'TRIAL';

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneCountryCode: dto.phoneCountryCode || '+55',
                phoneDDD: dto.phoneDDD,
                phoneNumber: dto.phoneNumber,
                document: dto.document,
                subscriptionCpf: dto.document,
                role: 'ADMIN', // Default role for new signups
                tenantId: tenant.id,
                trialExpiresAt: trialExpiresAt,
                subscriptionStatus: subscriptionStatus,
                notificationsEnabled: dto.notificationsEnabled !== undefined ? dto.notificationsEnabled : true,
            },
        });

        return {
            message: 'Cadastro realizado com sucesso',
            userId: user.id,
            trialExpiresAt: user.trialExpiresAt,
            trialAlreadyUsed: !!previousTrial
        };
    }

    async validateUser(dto: LoginDto) {
        const email = dto.email.toLowerCase();
        console.log(`[AuthService] Attempting login for: ${email}`);

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log(`[AuthService] User not found: ${email}`);
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            console.log(`[AuthService] Password mismatch for: ${email}`);
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        console.log(`[AuthService] Login successful for: ${email}, Role: ${user.role}`);

        // Generate JWT Token
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                subscriptionStatus: user.subscriptionStatus
            }
        };
    }
}
