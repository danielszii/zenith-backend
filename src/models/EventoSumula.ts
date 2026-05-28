// export interface EventoSumula {
//   id_evento?: number;
//   id_partida: number; // FK para partidas
//   id_atleta: number;  // FK para atletas (quem fez o gol/cartão)
//   tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO' | 'GOL_CONTRA';
//   minuto_jogo?: number | null;
//   timestamp_offline?: string | Date;
// }

export type propsEventoSumula = {
    id_partida: string; // FK para partidas
    id_atleta: string;  // FK para atletas (quem fez o gol/cartão)
    tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO' | 'GOL_CONTRA';
    minuto_jogo?: number | null;
    timestamp_offline?: string | Date;
}

export class EventoSumula {

    private constructor(private readonly props: propsEventoSumula){}

    public static construir(id_partida: string, id_atleta: string, tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO' | 'GOL_CONTRA', minuto_jogo?: number | null, timestamp_offline?: string | Date){

        if(!id_partida || !id_atleta || !tipo_evento){
            throw new Error("Os atributos id_partida, id_atleta e tipo_evento não podem ser vazios")
        }

        const props: propsEventoSumula = {id_partida, id_atleta, tipo_evento, minuto_jogo, timestamp_offline}

        return new EventoSumula(props)
    }

    public get id_partida(){
        return this.props.id_partida
    }
    public get id_atleta(){
        return this.props.id_atleta
    }
    public get tipo_evento(){
        return this.props.tipo_evento
    }
    public get minuto_jogo(){
        return this.props.minuto_jogo
    }
    public get timestamp_offline(){
        return this.props.timestamp_offline
    }
}