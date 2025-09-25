import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarEmpreendimentoDto {
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
        @IsString()
    cidade: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    @IsString()
    Uf: string;
}
