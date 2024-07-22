import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/Task/taskController';
import { authenticateToken } from '../middleware/authMiddleware'; 

const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.post('/', createTask);     
taskRouter.get('/', getTasks);           
taskRouter.get('/:id', getTaskById);    
taskRouter.put('/:id', updateTask);     
taskRouter.delete('/:id', deleteTask);  
export default taskRouter;
