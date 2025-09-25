import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class perfilUsuarioDto{

    @ApiProperty({ example: 1})
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: 'string'})
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsString()
    @IsNotEmpty()
    email: string;
}