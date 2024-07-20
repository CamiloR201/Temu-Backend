import express from 'express';


import { dataSource } from './data-source';
import taskRouter from './routes/taskRoutes';
import UseRouter from './routes/userRoutes';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/tasks', taskRouter);
app.use('/api/users', UseRouter);

// Iniciar el servidor y conectar a la base de datos
dataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch((error: any) => console.error('Error al conectar a la base de datos', error));
