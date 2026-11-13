import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:4300,http://127.0.0.1:4300')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET debe tener al menos 32 caracteres en backend/.env.');
  process.exitCode = 1;
} else if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT debe ser un número entero entre 1 y 65535.');
  process.exitCode = 1;
} else {
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ ok: true, servicio: 'raiz-local-api' });
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/categorias', categoryRoutes);
  app.use('/api/productos', productRoutes);
  app.use((_req, res) => {
    res.status(404).json({ ok: false, msg: 'La ruta solicitada no existe.' });
  });
  app.use(errorHandler);

  try {
    await connectDatabase(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`API de Raíz Local disponible en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la API:', error.message);
    process.exitCode = 1;
  }
}
