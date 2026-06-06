import { pool } from '../config/database.js';
import { propsCampeonato } from '../models/Campeonato.js';

export class CampeonatoRepository {
  async create(campeonato: propsCampeonato): Promise<propsCampeonato> {
    const query = `
      INSERT INTO campeonatos (id_campeonato, nome, formato, data_inicio, data_fim, criterios_desempate, status, modalidade, categoria)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      campeonato.id_campeonato,
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
  async findAll(): Promise<propsCampeonato[]> {
    const query = 'SELECT * FROM campeonatos ORDER BY id_campeonato DESC;';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Buscar um campeonato específico por ID
  async findById(id_campeonato: string): Promise<propsCampeonato | null> {
    const query = 'SELECT * FROM campeonatos WHERE id_campeonato = $1;';
    const { rows } = await pool.query(query, [id_campeonato]);
    return rows.length ? rows[0] : null;
  }

  async update(id: string, data: any) {
    const query = `
    UPDATE campeonatos 
    SET nome = $1, formato = $2, data_inicio = $3, data_fim = $4, criterios_desempate = $5, status = $6
    WHERE id_campeonato = $7 RETURNING *;
  `;
    const values = [data.nome, data.formato || null, data.data_inicio || null, data.data_fim || null, data.criterios_desempate || null, data.status || 'planejado', id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM campeonatos WHERE id_campeonato = $1;';
    await pool.query(query, [id]);
    return true;
  }

  // Verifica se o clube já está inscrito para evitar duplicidade
  async findInscricao(id_campeonato: string, id_clube: string): Promise<any> {
    const query = `
    SELECT * FROM campeonatos_clubes 
    WHERE id_campeonato = $1 AND id_clube = $2;
  `;
    const { rows } = await pool.query(query, [id_campeonato, id_clube]);
    return rows[0];
  }

  // Cria o registro na tabela intermediária
  async inscreverClube(id_campeonato: string, id_clube: string): Promise<any> {
    const query = `
    INSERT INTO campeonatos_clubes (id_campeonato, id_clube)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const { rows } = await pool.query(query, [id_campeonato, id_clube]);
    return rows[0];
  }
}