import { pool } from '../config/database.js';
import { EventoSumula, propsEventoSumula } from '../models/EventoSumula.js';


export class EventoRepository {

  async create(evento: EventoSumula): Promise<propsEventoSumula> {
    const query = `
      INSERT INTO eventos_sumula (id_evento, id_partida, id_atleta, id_clube, tipo_evento, minuto_evento, timestamp_offline )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;

    const values = [
      evento.id_evento,
      evento.id_partida,
      evento.id_atleta || null,
      evento.id_clube,
      evento.tipo_evento,
      evento.minuto_evento || null,
      evento.timestamp_offline || new Date()
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Retorna todos os eventos de uma partida específica (Súmula)
  async findByPartida(id_partida: string): Promise<propsEventoSumula[]> {
    const query = `
      SELECT e.*, a.nome as nome_atleta, c.nome as nome_clube
      FROM eventos_sumula e -- CORRIGIDO: Nome correto da tabela
      LEFT JOIN atletas a ON e.id_atleta = a.id_atleta
      LEFT JOIN clubes c ON e.id_clube = c.id_clube
      WHERE e.id_partida = $1
      ORDER BY e.minuto_evento ASC;
    `;

    const { rows } = await pool.query(query, [id_partida]);
    return rows;
  }
}