import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class loginDto{
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    senha: string;
}