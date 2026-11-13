import { Router } from 'express';
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategorias,
  listarTodasLasCategorias,
  obtenerCategoria
} from '../controllers/category.controller.js';
import { requireAuth, requireRole } from '../middleware/require-auth.js';

const router = Router();
const soloAdmin = [requireAuth, requireRole('admin')];

router.get('/', listarCategorias);
router.get('/admin/todas', ...soloAdmin, listarTodasLasCategorias);
router.get('/:id', obtenerCategoria);
router.post('/', ...soloAdmin, crearCategoria);
router.patch('/:id', ...soloAdmin, actualizarCategoria);
router.delete('/:id', ...soloAdmin, eliminarCategoria);

export default router;
