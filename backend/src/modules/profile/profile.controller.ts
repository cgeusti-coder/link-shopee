import { Controller, Get, Put, Body, Query, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SubscriptionGuard } from '../../auth/guards/subscription.guard';

@Controller('profile')
@UseGuards(SubscriptionGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    async getProfile(@Query('userId') userId: string) {
        // In a real app, userId would come from the JWT session.
        // For now, we take it from the query for development.
        return this.profileService.getProfile(userId);
    }

    @Put()
    async updateProfile(@Query('userId') userId: string, @Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile(userId, dto);
    }
}
