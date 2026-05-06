export interface Atleta {
    id_atleta?: number; 
    nome: string;
    cpf: string;
    rg?: string; 
    data_nasc: Date | string; 
    tipo_sanguineo: string; 
    peso?: number; 
    altura?: number; 
    status?: string; 
}