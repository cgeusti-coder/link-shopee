import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        // Basic login simulation for now
        // In a real app, this would return a JWT
        return {
            message: 'Login realizado com sucesso',
            user: {
                email: dto.email,
                role: 'ADMIN'
            }
        };
    }
}
