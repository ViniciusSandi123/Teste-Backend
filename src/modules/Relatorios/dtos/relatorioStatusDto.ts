import { ApiProperty } from '@nestjs/swagger';

export class RelatorioStatusDto {
  @ApiProperty()
  DISPONIVEL: number;

  @ApiProperty()
  RESERVADO: number;

  @ApiProperty()
  VENDIDO: number;
}