export type propsCampeonato = {
    nome: string;
    data_inicio: Date;
    data_fim: Date;
    modalidade: string;
    status?: string;
    formato?: string;
    criterios_desempate?: string;
    categoria?: string;
}

export class Campeonato {

    private constructor(private readonly props: propsCampeonato){}

    public static construir(nome: string, data_inicio: Date, data_fim: Date, modalidade: string, status?: string, formato?: string, criterios_desempate?: string, categoria?: string){

        if(!nome){
            throw new Error("O atributo nome não pode ser vazio")
        }

        const props: propsCampeonato = {nome, data_inicio, data_fim, modalidade, status, formato, criterios_desempate, categoria}

        return new Campeonato(props)
    }

    public get nome(){
        return this.props.nome
    }
    public get data_inicio(){
        return this.props.data_inicio
    }
    public get data_fim(){
        return this.props.data_fim
    }
    public get modalidade(){
        return this.props.modalidade
    }
    public get status(){
        return this.props.status
    }
    public get formato(){
        return this.props.formato
    }
    public get criterios_desempate(){
        return this.props.criterios_desempate
    }
    public get categoria(){
        return this.props.categoria
    }
}