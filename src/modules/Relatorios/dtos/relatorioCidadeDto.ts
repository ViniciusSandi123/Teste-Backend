import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class RelatorioCidadeDto {
  @ApiProperty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsInt()
  total: number;
}