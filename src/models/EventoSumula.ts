export interface EventoSumula {
  id_evento?: number;
  id_partida: number; // FK para partidas
  id_atleta: number;  // FK para atletas (quem fez o gol/cartão)
  tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO' | 'GOL_CONTRA';
  minuto_jogo?: number | null;
  timestamp_offline?: string | Date;
}