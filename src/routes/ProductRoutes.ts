import { Router } from 'express';
import {createProduct,getProducts,getProductById,updateProduct,deleteProduct} from '../controllers/Product/ProductController';

const router = Router();

// Rutas para productos
router.post('/products', createProduct);             // Crear un nuevo producto
router.get('/products', getProducts);               // Obtener todos los productos con paginación
router.get('/products/:id', getProductById);        // Obtener un producto por su ID
router.put('/products/:id', updateProduct);         // Actualizar un producto por su ID
router.delete('/products/:id', deleteProduct);      // Eliminar un producto por su ID

export default router;
