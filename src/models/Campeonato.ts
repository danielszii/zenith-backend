export type propsCampeonato = {
    id: string;
    nome: string;
    data_inicio: Date;
    data_fim: Date;
    local: string;
    modalidade: string;
    status?: string;
}

export class Campeonato {

    private constructor(private readonly props: propsCampeonato){}

    public static construir(nome: string, data_inicio: Date, data_fim: Date, local: string, modalidade: string){

        if(!nome){
            throw new Error("O atributo nome não pode ser vazio")
        }

        const id = crypto.randomUUID().toString()

        const props: propsCampeonato = {id, nome, data_inicio, data_fim, local, modalidade}

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
    public get local(){
        return this.props.local
    }
    public get modalidade(){
        return this.props.modalidade
    }
    public get status(){
        return this.props.status
    }
}