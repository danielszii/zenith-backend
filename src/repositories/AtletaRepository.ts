import { pool } from '../config/database.js';
import { propsAtleta } from '../models/Atleta.js';

export class AtletaRepository {
  async create(atleta: propsAtleta): Promise<propsAtleta> {
    const query = `
      INSERT INTO atletas (id_atleta, nome, cpf, rg, data_nasc, status, peso, altura, tipo_sanguineo, id_clube)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      atleta.id_atleta,
      atleta.nome,
      atleta.cpf,
      atleta.rg || null,
      atleta.data_nasc,
      atleta.status || 'ativo',
      atleta.peso || null,
      atleta.altura || null,
      atleta.tipo_sanguineo,
      atleta.id_clube || null
    ];

    const { rows } = await pool.query(query, values);
    return rows[0]; 
  }
  async findAll(): Promise<propsAtleta[]> {
    const query = 'SELECT * FROM atletas ORDER BY nome ASC;';
    const { rows } = await pool.query(query);
    return rows;
  }
  async findById(id: string): Promise<propsAtleta | null> {
    const query = 'SELECT * FROM atletas WHERE id_atleta = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async update(id: string, data: any) {
    const query = `
    UPDATE atletas 
    SET nome = $1, cpf = $2, data_nasc = $3, status = $4, peso = $5, altura = $6, tipo_sanguineo = $7
    WHERE id_atleta = $8 RETURNING *;
  `;
    const values = [data.nome, data.cpf, data.data_nasc, data.status || 'ativo', data.peso || null, data.altura || null, data.tipo_sanguineo, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM atletas WHERE id_atleta = $1;';
    await pool.query(query, [id]);
    return true;
  }
}