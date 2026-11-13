import { Router } from 'express';
import { iniciarSesion, obtenerSesion, registrar } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/require-auth.js';

const router = Router();

router.post('/registro', registrar);
router.post('/login', iniciarSesion);
router.get('/me', requireAuth, obtenerSesion);

export default router;
