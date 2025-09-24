import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class AdicionaFavoritoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  unidadeId: number;
}
