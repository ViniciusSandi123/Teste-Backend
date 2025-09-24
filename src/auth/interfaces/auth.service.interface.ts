import { criarUsuarioDto } from "../dtos/criarUsuarioDto";
import { loginDto } from "../dtos/loginDto";

export interface AuthServiceInterface{
    login(dto: loginDto);
    criacaoUsuario(dto: criarUsuarioDto);
}