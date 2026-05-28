import { pool } from '../config/database.js'
import { Clube } from '../models/Clube.js';


export class ClubeRepository {
    async create(clube: Clube): Promise<Clube> {
        const query = `
        INSERT INTO clubes (nome, brasao, cores_oficiais, responsavel, cnpj)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `
        const values = [
            clube.nome,
            clube.brasao || null,
            clube.cores_oficiais || null,
            clube.responsavel || null,
            clube.cnpj || null
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async findAll(): Promise<Clube[]> {
        const query = `SELECT * FROM clubes ORDER BY nome ASC;`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async findById(id_clube: number): Promise<Clube | null> {
        const query = 'SELECT * FROM clubes WHERE id_clube = $1;';
        const { rows } = await pool.query(query, [id_clube]);
        return rows.length ? rows[0] : null;
    }

    async update(id: number, data: any) {
        const query = `UPDATE clubes SET nome = $1, brasao = $2, cores_oficiais = $3, responsavel = $4, cnpj = $5WHERE id_clube = $6 RETURNING *;`;
        const values = [data.nome, data.brasao || null, data.cores_oficiais || null, data.responsavel || null, data.cnpj || null, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async delete(id: number) {
        const query = 'DELETE FROM clubes WHERE id_clube = $1;';
        await pool.query(query, [id]);
        return true;
    }

}