import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.module';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async findOne(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneCountryCode: true,
                phoneDDD: true,
                phoneNumber: true,
                document: true,
                notificationsEnabled: true,
                subscriptionStatus: true,
                role: true,
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return user;
    }

    async update(userId: string, dto: UpdateProfileDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneCountryCode: dto.phoneCountryCode,
                phoneDDD: dto.phoneDDD,
                phoneNumber: dto.phoneNumber,
                document: dto.document,
                notificationsEnabled: dto.notificationsEnabled,
            },
        });
    }
}
