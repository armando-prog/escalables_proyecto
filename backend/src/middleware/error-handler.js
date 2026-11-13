import mongoose from 'mongoose';

export function errorHandler(error, _req, res, _next) {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ ok: false, msg: error.message });
  }

  if (error?.code === 11000) {
    return res.status(409).json({ ok: false, msg: 'Ya existe un registro con esos datos.' });
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ ok: false, msg: 'El cuerpo de la solicitud no es JSON válido.' });
  }

  console.error('Error en la API:', error);
  return res.status(500).json({ ok: false, msg: 'Ocurrió un error inesperado en el servidor.' });
}
