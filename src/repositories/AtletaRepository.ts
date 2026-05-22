import { pool } from '../config/database.js'; // Conexão que configuramos

export class AtletaRepository {

  /**
   * Insere um novo atleta no banco (Baseado no seu DER)[cite: 2]
   */
  async create(data: any) {
    // Usamos $1, $2 para prevenir SQL Injection (Segurança Profissional)
    const query = `
      INSERT INTO atletas (nome, cpf, data_nasc, status, peso, altura)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *; -- Retorna o registro criado, incluindo o id_atleta gerado
    `;

    const values = [
      data.nome,
      data.cpf,
      data.data_nasc,
      data.status || 'ativo',
      data.peso || null,
      data.altura || null
    ];

    const { rows } = await pool.query(query, values);
    return rows[0]; // Retorna apenas o objeto criado
  }

  /**
   * Busca todos os atletas
   */
  async findAll() {
    const query = 'SELECT * FROM atletas ORDER BY nome ASC;';
    const { rows } = await pool.query(query);
    return rows;
  }

  /**
   * Busca um atleta por ID
   */
  async findById(id: number) {
    const query = 'SELECT * FROM atletas WHERE id_atleta = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async update(id: number, data: any) {
    const query = `
    UPDATE atletas 
    SET nome = $1, cpf = $2, data_nasc = $3, status = $4, peso = $5, altura = $6
    WHERE id_atleta = $7 RETURNING *;
  `;
    const values = [data.nome, data.cpf, data.data_nasc, data.status || 'ativo', data.peso || null, data.altura || null, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: number) {
    const query = 'DELETE FROM atletas WHERE id_atleta = $1;';
    await pool.query(query, [id]);
    return true;
  }
}