import { pool } from '../config/database.js';
import { Campeonato } from '../models/Campeonato.js';

export class CampeonatoRepository {
  // Criar um campeonato
  async create(campeonato: Campeonato): Promise<Campeonato> {
    const query = `
      INSERT INTO campeonatos (nome, formato, criterios_desempate, status, modalidade, categoria)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      campeonato.nome,
      campeonato.formato,
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
    SET nome = $1, formato = $2, criterios_desempate = $3, status = $4
    WHERE id_campeonato = $5 RETURNING *;
  `;
    const values = [data.nome, data.formato || null, data.criterios_desempate || null, data.status || 'planejado', id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: number) {
    const query = 'DELETE FROM campeonatos WHERE id_campeonato = $1;';
    await pool.query(query, [id]);
    return true;
  }
}