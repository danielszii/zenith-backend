import { pool } from '../config/database.js'; // Conexão que configuramos
import { propsAtleta } from '../models/Atleta.js';

export class AtletaRepository {
  async create(atleta: propsAtleta): Promise<propsAtleta> {
    const query = `
      INSERT INTO atletas (nome, cpf, data_nasc, status, peso, altura, tipo_sanguineo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      atleta.nome,
      atleta.cpf,
      atleta.data_nasc,
      atleta.status || 'ativo',
      atleta.peso || null,
      atleta.altura || null,
      atleta.tipo_sanguineo
    ];

    const { rows } = await pool.query(query, values);
    return rows[0]; // Retorna apenas o objeto criado
  }
  // Busca todos os atletas
  async findAll(): Promise<propsAtleta[]> {
    const query = 'SELECT * FROM atletas ORDER BY nome ASC;';
    const { rows } = await pool.query(query);
    return rows;
  }
  // Busca um atleta por ID
  async findById(id: number): Promise<propsAtleta | null>{
    const query = 'SELECT * FROM atletas WHERE id_atleta = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async update(id: number, data: any) {
    const query = `
    UPDATE atletas 
    SET nome = $1, cpf = $2, data_nasc = $3, status = $4, peso = $5, altura = $6, tipo_sanguineo = $7
    WHERE id_atleta = $8 RETURNING *;
  `;
    const values = [data.nome, data.cpf, data.data_nasc, data.status || 'ativo', data.peso || null, data.altura || null, data.tipo_sanguineo, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM atletas WHERE id_atleta = $1;';
    await pool.query(query, [id]);
    return true;
  }
}