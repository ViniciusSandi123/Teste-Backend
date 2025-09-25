import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class loginDto{
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @MinLength(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    senha: string;
}