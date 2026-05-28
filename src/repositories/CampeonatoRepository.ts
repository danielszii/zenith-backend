import { pool } from '../config/database.js';
import { Campeonato } from '../models/Campeonato.js';

export class CampeonatoRepository {
  async create(campeonato: Campeonato): Promise<Campeonato> {
    const query = `
      INSERT INTO campeonatos (nome, formato, data_inicio, data_fim, criterios_desempate, status, modalidade, categoria)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      campeonato.nome,
      campeonato.formato,
      campeonato.data_inicio,
      campeonato.data_fim,
      campeonato.criterios_desempate,
      campeonato.status || 'planejado',
      campeonato.modalidade,
      campeonato.categoria
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Listar campeonatos ativos/planejados
  async findAll(): Promise<Campeonato[]> {
    const query = 'SELECT * FROM campeonatos ORDER BY id_campeonato DESC;';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Buscar um campeonato específico por ID
  async findById(id_campeonato: number): Promise<Campeonato | null> {
    const query = 'SELECT * FROM campeonatos WHERE id_campeonato = $1;';
    const { rows } = await pool.query(query, [id_campeonato]);
    return rows.length ? rows[0] : null;
  }

  async update(id: number, data: any) {
    const query = `
    UPDATE campeonatos 
    SET nome = $1, formato = $2, data_inicio = $3, data_fim = $4, criterios_desempate = $5, status = $6
    WHERE id_campeonato = $7 RETURNING *;
  `;
    const values = [data.nome, data.formato || null, data.data_inicio || null, data.data_fim || null, data.criterios_desempate || null, data.status || 'planejado', id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: number) {
    const query = 'DELETE FROM campeonatos WHERE id_campeonato = $1;';
    await pool.query(query, [id]);
    return true;
  }
}