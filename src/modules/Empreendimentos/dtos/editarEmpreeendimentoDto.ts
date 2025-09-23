import { PartialType } from '@nestjs/mapped-types';
import { CriarEmpreendimentoDto } from './criarEmpreendimentoDto';

export class EditarEmpreendimentoDto extends PartialType(CriarEmpreendimentoDto) {}
