import { PartialType } from '@nestjs/mapped-types';
import { CriarUnidadeDto } from './criarUnidadeDto';

export class EditarUnidadeDto extends PartialType(CriarUnidadeDto) {}
