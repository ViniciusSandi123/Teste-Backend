import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { range } from 'rxjs';

export class CriarUnidadeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  empreendimento_id: number;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  torre: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  metro_quadrado: number;

  @ApiProperty({ example: 1234567 })
  @IsNumber()
  preco: number;

  @ApiProperty({ example: 1, description: 'Status: DISPONIVEL=1, RESERVADO=2, VENDIDO=3' })
  @IsOptional()
  @Min(1)
  @Max(3)
  status?: number;
}
