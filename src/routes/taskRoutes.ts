import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/Task/taskController';
import { authenticateToken } from '../middleware/authMiddleware'; 
import { getProducts } from '../controllers/Product/ProductController';
const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.post('/', createTask);     
taskRouter.get('/', getTasks);           
taskRouter.get('/:id', getTaskById);    
taskRouter.put('/:id', updateTask);     
taskRouter.delete('/:id', deleteTask);  
taskRouter.get('/products', getProducts);

export default taskRouter;
