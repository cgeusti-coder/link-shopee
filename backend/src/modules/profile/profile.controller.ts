import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    findOne(@Req() req: any) {
        return this.profileService.findOne(req.user.id);
    }

    @Patch()
    update(@Body() updateProfileDto: UpdateProfileDto, @Req() req: any) {
        return this.profileService.update(req.user.id, updateProfileDto);
    }
}
