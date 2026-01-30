import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.module';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Este e-mail já está cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Is it the Master account?
        const isMaster = dto.email.toLowerCase() === 'waniely2357@gmail.com';

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

        // 15 days trial (or infinite if Master, or 0 if trial already used)
        let trialExpiresAt = null;
        let subscriptionStatus: any = 'TRIAL';

        if (isMaster) {
            subscriptionStatus = 'ACTIVE';
        } else if (previousTrial) {
            subscriptionStatus = 'EXPIRED'; // Early block for trial abusers
        } else {
            trialExpiresAt = new Date();
            trialExpiresAt.setDate(trialExpiresAt.getDate() + 15);
        }

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
                role: isMaster ? 'MASTER' : 'ADMIN',
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
            isMaster: isMaster,
            trialAlreadyUsed: !!previousTrial && !isMaster
        };
    }

    async validateUser(dto: LoginDto) {
        console.log(`[AUTH] Tentativa de login para: ${dto.email}`);

        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            console.log(`[AUTH] Usuário não encontrado: ${dto.email}`);
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        console.log(`[AUTH] Usuário encontrado. Comparando senhas...`);
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            console.log(`[AUTH] Senha inválida para: ${dto.email}`);
            // console.log(`DEBUG: Senha digitada: ${dto.password}`); // CUIDADO: Apenas para debug temporário se necessário
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        console.log(`[AUTH] Login bem-sucedido: ${dto.email}`);
        const isMaster = user.email.toLowerCase() === 'waniely2357@gmail.com';

        return {
            message: 'Login realizado com sucesso',
            userId: user.id,
            email: user.email,
            role: isMaster ? 'MASTER' : user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            subscriptionStatus: user.subscriptionStatus
        };
    }
}
