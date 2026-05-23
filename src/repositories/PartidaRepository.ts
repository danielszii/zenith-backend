import { pool } from '../config/database.js';
import { Partida } from '../models/Partida.js'; // Caso tenha a interface separada

export class PartidaRepository {
  
  async create(data: any): Promise<Partida> {
    const query = `
      INSERT INTO partidas (id_campeonato, id_clube_casa, id_clube_fora, id_local, data, hora, status_partida)
      VALUES ($1, $2, $3, $4, $5, $6, 'agendado')
      RETURNING *;
    `;
    const values = [
      data.id_campeonato, 
      data.id_clube_casa, 
      data.id_clube_fora, 
      data.id_local || null, 
      data.data, 
      data.hora
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async findAll(): Promise<Partida[]> {
    const query = 'SELECT * FROM partidas ORDER BY data DESC, hora DESC;';
    const { rows } = await pool.query(query);
    return rows;
  }

  async findById(id_partida: number): Promise<Partida | null> {
    const query = 'SELECT * FROM partidas WHERE id_partida = $1;';
    const { rows } = await pool.query(query, [id_partida]);
    return rows.length ? rows[0] : null;
  }

  async updateStatus(id_partida: number, status: string): Promise<Partida> {
    const query = `
      UPDATE partidas SET status_partida = $1 WHERE id_partida = $2 RETURNING *;
    `;
    const { rows } = await pool.query(query, [status, id_partida]);
    return rows[0];
  }
}