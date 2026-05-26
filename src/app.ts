import 'reflect-metadata';
import express, { type Request as req, type Response as res} from 'express';
import { testConnection } from './config/database.js';
import routes from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(routes);

const startServer = async () => {
    // Tenta conectar ao banco antes de abrir o servidor
   // await testConnection(); 

    app.listen(3000, () => {
        console.log('Zenith Server is running on port 3000');
    });
};

startServer();