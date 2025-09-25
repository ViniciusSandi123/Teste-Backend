import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusUnidade } from '../enums/StatusUnidade.enums';

export class CriarUnidadeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  empreendimento_id: number;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  torre: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  metro_quadrado: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @ApiProperty({ example: 1})
  @IsOptional()
  @IsEnum(StatusUnidade)
  @IsIn([1, 2, 3])
  status?: number;
}
