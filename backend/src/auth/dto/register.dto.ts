import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    firstName: string;

    @IsNotEmpty({ message: 'O sobrenome é obrigatório' })
    lastName: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;

    @IsOptional()
    phoneCountryCode?: string = '+55';

    @IsNotEmpty({ message: 'O DDD é obrigatório' })
    @Matches(/^\d{2}$/, { message: 'DDD deve ter 2 dígitos' })
    phoneDDD: string;

    @IsNotEmpty({ message: 'O número de telefone é obrigatório' })
    @Matches(/^\d{8,11}$/, { message: 'Número de telefone inválido' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'O CPF ou CNPJ é obrigatório' })
    @Matches(/^\d{11,14}$/, { message: 'CPF ou CNPJ deve conter apenas números' })
    document: string;

    @IsOptional()
    notificationsEnabled?: boolean;
}
