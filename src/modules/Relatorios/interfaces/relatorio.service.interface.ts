import { RelatorioCidadeDto } from "../dtos/relatorioCidadeDto";
import { RelatorioStatusDto } from "../dtos/relatorioStatusDto";

export interface RelatorioServiceInterface{
    relatorioUnidadePorStatus(): Promise<RelatorioStatusDto>;
    relatorioUnidadePorCidade(): Promise<RelatorioCidadeDto[]>;
}