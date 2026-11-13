import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Usuario } from '../models/usuario.js';

const correo = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!correo || !password || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
  console.error('Configura ADMIN_EMAIL y una ADMIN_PASSWORD de 8 a 72 bytes en backend/.env.');
  process.exitCode = 1;
} else {
  try {
    await connectDatabase(process.env.MONGODB_URI);
    const existente = await Usuario.findOne({ correo });

    if (existente) {
      if (existente.rol !== 'admin') {
        existente.rol = 'admin';
        await existente.save();
      }
      console.log('La cuenta de administración ya está configurada.');
    } else {
      await Usuario.create({
        nombre: 'Administración',
        apellidos: 'Raíz Local',
        correo,
        passwordHash: password,
        rol: 'admin'
      });
      console.log('Cuenta de administración creada.');
    }
  } catch (error) {
    console.error('No se pudo crear la cuenta de administración:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
