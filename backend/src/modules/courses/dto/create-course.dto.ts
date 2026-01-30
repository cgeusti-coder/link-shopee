import { IsNotEmpty, IsUrl, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty({ message: 'O nome do curso é obrigatório' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'A descrição é obrigatória' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'A imagem é obrigatória' })
    @IsString()
    imageUrl: string;

    @IsNotEmpty({ message: 'O link de afiliado é obrigatório' })
    @IsUrl({}, { message: 'O link de afiliado deve ser uma URL válida' })
    affiliateLink: string;
}
