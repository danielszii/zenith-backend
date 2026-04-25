import express, { type Request, type Response } from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});