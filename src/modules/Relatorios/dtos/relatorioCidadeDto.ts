import { ApiProperty } from '@nestjs/swagger';

export class RelatorioCidadeDto {
  @ApiProperty()
  cidade: string;

  @ApiProperty()
  total: number;
}