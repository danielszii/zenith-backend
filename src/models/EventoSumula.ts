import { BadRequestError } from "../errors/AppError";

export type propsEventoSumula = {
    id_partida: string; // FK para partidas
    id_atleta: string;  // FK para atletas (quem fez o gol/cartão)
    id_clube: string;
    tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO';
    minuto_evento?: number | null;
    timestamp_offline?: string | Date;
    // descricao?: string;
}

export class EventoSumula {

    private constructor(private readonly props: propsEventoSumula){}

    public static construir(id_partida: string, id_atleta: string, id_clube: string, tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO', minuto_evento?: number | null, timestamp_offline?: string | Date){

        if(!id_partida || !id_atleta || !tipo_evento){
            throw new BadRequestError("Os atributos id_partida, id_atleta e tipo_evento não podem ser vazios")
        }

        const props: propsEventoSumula = {id_partida, id_atleta, id_clube, tipo_evento, minuto_evento, timestamp_offline}

        return new EventoSumula(props)
    }

    public get id_partida(){
        return this.props.id_partida
    }
    public get id_atleta(){
        return this.props.id_atleta
    }
    public get id_clube(){
        return this.props.id_clube
    }
    public get tipo_evento(){
        return this.props.tipo_evento
    }
    public get minuto_evento(){
        return this.props.minuto_evento
    }
    public get timestamp_offline(){
        return this.props.timestamp_offline
    }
}