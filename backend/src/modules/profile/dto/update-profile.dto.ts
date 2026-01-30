import { IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phoneCountryCode?: string;

    @IsOptional()
    @IsString()
    phoneDDD?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    document?: string;

    @IsOptional()
    @IsBoolean()
    notificationsEnabled?: boolean;
}
