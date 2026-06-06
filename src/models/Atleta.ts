import { BadRequestError } from "../errors/AppError.js";


// O modelo Atleta representa um atleta com seus atributos e validações
export type propsAtleta = {
    nome: string;
    cpf: string;
    rg?: string;
    data_nasc: string | Date;
    tipo_sanguineo: string;
    peso?: number;
    altura?: number;
    status?: string;
}


export class Atleta {
    // O construtor é privado para forçar o uso do método estático "construir" para criar instâncias de Atleta
    private constructor(private readonly props: propsAtleta) { }
    // O método estático "construir" é responsável por validar os dados e criar uma nova instância de Atleta
    public static construir(nome: string, cpf: string, data_nasc: string | Date, tipo_sanguineo: string) {
        if (!nome || !cpf || !data_nasc || !tipo_sanguineo) {
            throw new BadRequestError("Os atributos nome, cpf, data de nascimento e tipo sanguíneo não podem ser vazios")
        }
        const dataConvertida = typeof data_nasc === 'string' ? new Date(data_nasc) : data_nasc;
        const props: propsAtleta = {
            nome,
            cpf,
            data_nasc: dataConvertida,
            tipo_sanguineo
        }

        return new Atleta(props)

    }

    // Os getters permitem acessar os atributos do atleta de forma controlada, mantendo a imutabilidade dos dados
    public get nome() {
        return this.props.nome
    }
    public get cpf() {
        return this.props.cpf
    }
    public get rg() {
        return this.props.rg
    }
    public get data_nasc() {
        return this.props.data_nasc
    }
    public get tipo_sanguineo() {
        return this.props.tipo_sanguineo
    }
    public get peso() {
        return this.props.peso
    }
    public get altura() {
        return this.props.altura
    }
    public get status() {
        return this.props.status
    }
}