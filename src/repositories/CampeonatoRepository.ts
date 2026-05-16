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
}