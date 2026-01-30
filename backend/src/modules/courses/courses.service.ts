import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.module';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.course.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(dto: CreateCourseDto) {
        return this.prisma.course.create({
            data: dto,
        });
    }

    async remove(id: string) {
        return this.prisma.course.delete({
            where: { id },
        });
    }
}
