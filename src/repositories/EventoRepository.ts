import { pool } from '../config/database.js';

export class EventoRepository {

  async create(data: any) {
    const query = `
      INSERT INTO eventos_sumula (id_partida, id_atleta, id_clube, tipo_evento, minuto_evento, descricao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    
    // Mapeando corretamente os dados que vêm do DTO para a query
    const values = [
      data.id_partida,
      data.id_atleta || null,
      data.id_clube || null,
      data.tipo_evento,
      data.minuto_jogo, // Vem do DTO como minuto_jogo, salva como minuto_evento
      data.descricao || null
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Retorna todos os eventos de uma partida específica (Súmula)
  async findByPartida(id_partida: number) {
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