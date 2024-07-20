import { Router } from 'express'; 
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController';

const taskRouter = Router();

// Rutas para tareas
taskRouter.post('/', createTask);        // Crear una nueva tarea
taskRouter.get('/', getTasks);           // Obtener todas las tareas
taskRouter.get('/:id', getTaskById);     // Obtener una tarea por ID
taskRouter.put('/:id', updateTask);     // Actualizar una tarea existente
taskRouter.delete('/:id', deleteTask);  // Eliminar una tarea

export default taskRouter;
