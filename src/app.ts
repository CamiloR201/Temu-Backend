import express from 'express';
import { dataSource } from './data-source';
import taskRouter from './routes/taskRoutes';
import userRouter from './routes/userRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'default_secret'; 

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Iniciar el servidor y conectar a la base de datos
dataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Error al conectar a la base de datos', error);
        process.exit(1); 
    });
