import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Post()
    @Roles('MASTER')
    async create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Delete(':id')
    @Roles('MASTER')
    async remove(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }
}
