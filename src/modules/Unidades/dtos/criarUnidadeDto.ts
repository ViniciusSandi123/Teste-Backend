import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

  @ApiProperty({ example: 1 })
  @IsNumber()
  preco: number;

  @ApiProperty({ example: 1})
  @IsOptional()
  @IsIn([1, 2, 3])
  status?: number;
}
