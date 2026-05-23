import { pool } from '../config/database.js';

export class EventoSumulaRepository {
  
  async create(data: any) {
    const query = `
      INSERT INTO eventos_sumula (id_partida, id_atleta, tipo_evento, minuto_jogo)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [data.id_partida, data.id_atleta, data.tipo_evento, data.minuto_jogo || null];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Retorna todos os eventos de UMA partida específica (Essencial para gerar o PDF depois)
  async findByPartida(id_partida: number) {
    const query = `
      SELECT e.*, a.nome as nome_atleta 
      FROM eventos_sumula e
      JOIN atletas a ON e.id_atleta = a.id_atleta
      WHERE e.id_partida = $1
      ORDER BY e.minuto_jogo ASC, e.timestamp_offline ASC;
    `;
    const { rows } = await pool.query(query, [id_partida]);
    return rows;
  }
}