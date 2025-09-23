import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class criarUsuarioDto{
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    nome: string;
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    senha: string;
}