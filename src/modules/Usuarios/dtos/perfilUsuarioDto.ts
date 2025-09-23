import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class perfilUsuarioDto{

    @ApiProperty({ example: 'int'})
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    email: string;
}