import { Controller, Get, Post, Body, Delete, Param, UseGuards, ForbiddenException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { PrismaService } from '../../prisma/prisma.module';

@Controller('courses')
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
        private prisma: PrismaService
    ) { }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto, @Body('userId') userId: string) {
        await this.checkMaster(userId);
        return this.coursesService.create(createCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Body('userId') userId: string) {
        await this.checkMaster(userId);
        return this.coursesService.remove(id);
    }

    private async checkMaster(userId: string) {
        if (!userId) throw new ForbiddenException('Apenas para administradores Master.');

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user || user.role !== 'MASTER') {
            throw new ForbiddenException('Acesso restrito à conta Master.');
        }
    }
}
