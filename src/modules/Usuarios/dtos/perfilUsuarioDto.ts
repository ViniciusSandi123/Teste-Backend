import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class perfilUsuarioDto{

    @ApiProperty({ example: 1})
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    email: string;
}