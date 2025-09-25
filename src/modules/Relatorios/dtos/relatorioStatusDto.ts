import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusUnidade } from 'src/modules/Unidades/enums/StatusUnidade.enums';

export class RelatorioStatusDto {
  @ApiProperty()
  @IsEnum(StatusUnidade)
  DISPONIVEL: number;

  @ApiProperty()
  @IsEnum(StatusUnidade)
  RESERVADO: number;

  @ApiProperty()
  @IsEnum(StatusUnidade)
  VENDIDO: number;
}