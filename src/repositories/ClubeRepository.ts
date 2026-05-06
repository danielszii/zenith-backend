import { pool } from '../config/database.js'

export class ClubeRepository {
    async create(data: any) {

        const query = `
        INSERT INTO clubes (id_clube, nome, brasao, cores_oficiais, responsavel, cnpj)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `
        const values = [
            data.id_clube,
            data.nome,
            data.brasao,
            data.cores_oficiais,
            data.responsavel,
            data.cnpj
        ];

        const { rows } = await pool.query(query, values);
            return rows[0]; // Retorna apenas o objeto criado
        }

    async findAll() {   
        const query = `SELECT * FROM clubes;`;
        const { rows } = await pool.query(query);
        return rows; // Retorna a lista de clubes
    }
        
}