import { Router } from 'express';
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  listarTodosLosProductos,
  obtenerProducto
} from '../controllers/product.controller.js';
import { requireAuth, requireRole } from '../middleware/require-auth.js';

const router = Router();
const soloAdmin = [requireAuth, requireRole('admin')];

router.get('/', listarProductos);
router.get('/admin/todos', ...soloAdmin, listarTodosLosProductos);
router.get('/:id', obtenerProducto);
router.post('/', ...soloAdmin, crearProducto);
router.patch('/:id', ...soloAdmin, actualizarProducto);
router.delete('/:id', ...soloAdmin, eliminarProducto);

export default router;
