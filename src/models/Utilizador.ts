export interface Utilizador {
  id_utilizador?: number;
  nome: string;
  email: string;
  senha?: string; // Mantido opcional para quando retornarmos o usuário sem expor o hash da senha
  perfil: string; // Ex: 'admin', 'gestor', 'arbitro'
}