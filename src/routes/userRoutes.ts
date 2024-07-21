import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';
import { registerUser, loginUser } from '../controllers/authController'; // Ajusta el path según tu estructura

const UseRouter = Router();

// Rutas para usuarios
UseRouter.post('/', createUser);        // Crear un nuevo usuario
UseRouter.get('/', getUsers);           // Obtener todos los usuarios
UseRouter.get('/:id', getUserById);     // Obtener un usuario por ID
UseRouter.put('/:id', updateUser);     // Actualizar un usuario existente
UseRouter.delete('/:id', deleteUser);  // Eliminar un usuario

// Rutas para autenticación
UseRouter.post('/register', registerUser); // Registrar un nuevo usuario
UseRouter.post('/login', loginUser);       // Iniciar sesión

export default UseRouter;
