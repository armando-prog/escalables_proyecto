import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.js';

function datosBasicosValidos(nombre, apellidos, correo) {
  return (
    typeof nombre === 'string' &&
    nombre.trim() &&
    typeof apellidos === 'string' &&
    apellidos.trim() &&
    typeof correo === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
  );
}

function crearToken(usuario) {
  return jwt.sign({ rol: usuario.rol }, process.env.JWT_SECRET, {
    subject: usuario._id.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  });
}

function respuestaDeSesion(usuario) {
  return {
    token: crearToken(usuario),
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
}

export async function registrar(req, res, next) {
  const { nombre, apellidos, correo, password } = req.body ?? {};

  if (
    !datosBasicosValidos(nombre, apellidos, correo) ||
    typeof password !== 'string' ||
    password.length < 8 ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).json({
      ok: false,
      msg: 'Ingresa nombre, apellidos, un correo válido y una contraseña de 8 a 72 bytes.'
    });
  }

  try {
    const usuario = await Usuario.create({
      nombre,
      apellidos,
      correo: correo.toLowerCase().trim(),
      passwordHash: password,
      rol: 'cliente'
    });

    return res.status(201).json(respuestaDeSesion(usuario));
  } catch (error) {
    return next(error);
  }
}

export async function iniciarSesion(req, res, next) {
  const { correo, password } = req.body ?? {};

  if (typeof correo !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ ok: false, msg: 'Ingresa tu correo y contraseña.' });
  }

  try {
    const usuario = await Usuario.findOne({ correo: correo.toLowerCase().trim() }).select('+passwordHash');

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ ok: false, msg: 'El correo o la contraseña no son correctos.' });
    }

    return res.status(200).json(respuestaDeSesion(usuario));
  } catch (error) {
    return next(error);
  }
}

export async function obtenerSesion(req, res, next) {
  try {
    const usuario = await Usuario.findById(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ ok: false, msg: 'La cuenta ya no existe.' });
    }

    return res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rol: usuario.rol
    });
  } catch (error) {
    return next(error);
  }
}
