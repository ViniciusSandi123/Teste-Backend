import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CriarEmpreendimentoDto {
    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    cidade: string;

    @ApiProperty({ example: 'string'})
    @IsNotEmpty()
    Uf: string;
}
