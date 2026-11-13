import jwt from 'jsonwebtoken';

const rolesValidos = new Set(['cliente', 'admin']);

export function requireAuth(req, res, next) {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';

  if (!token) {
    return res.status(401).json({ ok: false, msg: 'Inicia sesión para continuar.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof payload === 'string' ||
      typeof payload.sub !== 'string' ||
      typeof payload.rol !== 'string' ||
      !rolesValidos.has(payload.rol)
    ) {
      return res.status(401).json({ ok: false, msg: 'La sesión no es válida.' });
    }

    req.usuario = { id: payload.sub, rol: payload.rol };
    return next();
  } catch {
    return res.status(401).json({ ok: false, msg: 'La sesión expiró o no es válida.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.rol)) {
      return res.status(403).json({ ok: false, msg: 'No tienes permiso para esta operación.' });
    }

    return next();
  };
}
