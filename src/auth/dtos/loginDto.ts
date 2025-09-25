import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class loginDto{
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @IsEmail({})
    email: string;
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @MinLength(4)
    senha: string;
}