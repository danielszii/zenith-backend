import { pool } from '../config/database.js'
import { Clube } from '../models/Clube.js';

export class ClubeRepository {
    async create(clube: Clube): Promise<Clube> {
        const query = `
        INSERT INTO clubes (id_clube, nome, brasao, cores_oficiais, responsavel, cnpj)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `
        const values = [
            clube.id_clube,
            clube.nome,
            clube.brasao,
            clube.cores_oficiais,
            clube.responsavel,
            clube.cnpj
        ];

        const { rows } = await pool.query(query, values);
            return rows[0]; // Retorna apenas o objeto criado
        }

    async findAll(): Promise<Clube[]> {   
        const query = `SELECT * FROM clubes ORDER BY nome ASC;`;
        const { rows } = await pool.query(query);
        return rows; // Retorna a lista de clubes
    }

    async findById(id_clube: number): Promise<Clube | null> {
        const query = 'SELECT * FROM clubes WHERE id_clube = $1;';
        const { rows } = await pool.query(query, [id_clube]);
        return rows.length ? rows[0] : null;
    }
        
}