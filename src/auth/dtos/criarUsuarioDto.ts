import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class criarUsuarioDto{
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @IsEmail({})
    email: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @MinLength(4)
    senha: string;
}