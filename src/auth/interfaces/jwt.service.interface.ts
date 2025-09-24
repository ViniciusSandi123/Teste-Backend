export interface JtwServiceInterface {
    gerarToken(payload: { sub: number; email: string });
    verificarToken(token: string);
}