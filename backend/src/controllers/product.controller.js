import mongoose from 'mongoose';
import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';

function idValido(id) {
  return mongoose.isValidObjectId(id);
}

export async function listarProductos(req, res, next) {
  try {
    const filtro = { activo: true };

    if (req.query.categoria) {
      if (!idValido(req.query.categoria)) {
        return res.status(400).json({ ok: false, msg: 'El filtro de categoría no es válido.' });
      }

      if (!(await Categoria.exists({ _id: req.query.categoria, activa: true }))) {
        return res.status(200).json([]);
      }

      filtro.categoria = req.query.categoria;
    } else {
      filtro.categoria = { $in: await Categoria.find({ activa: true }).distinct('_id') };
    }

    if (typeof req.query.buscar === 'string' && req.query.buscar.trim()) {
      const texto = req.query.buscar.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filtro.$or = [
        { nombre: { $regex: texto, $options: 'i' } },
        { descripcion: { $regex: texto, $options: 'i' } }
      ];
    }

    const productos = await Producto.find(filtro)
      .populate('categoria', 'nombre slug')
      .sort({ createdAt: -1 });
    return res.status(200).json(productos);
  } catch (error) {
    return next(error);
  }
}

export async function listarTodosLosProductos(_req, res, next) {
  try {
    const productos = await Producto.find()
      .populate('categoria', 'nombre slug')
      .sort({ createdAt: -1 });
    return res.status(200).json(productos);
  } catch (error) {
    return next(error);
  }
}

export async function obtenerProducto(req, res, next) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de producto no es válido.' });
  }

  try {
    const producto = await Producto.findOne({ _id: req.params.id, activo: true })
      .populate({ path: 'categoria', match: { activa: true }, select: 'nombre slug' });
    if (!producto?.categoria) {
      return res.status(404).json({ ok: false, msg: 'El producto no existe o no está disponible.' });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return next(error);
  }
}

export async function crearProducto(req, res, next) {
  const { nombre, descripcion, precio, imagenUrl, stock, categoria } = req.body ?? {};

  try {
    if (!idValido(categoria) || !(await Categoria.exists({ _id: categoria, activa: true }))) {
      return res.status(400).json({ ok: false, msg: 'Selecciona una categoría activa.' });
    }

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagenUrl,
      stock,
      categoria
    });
    await producto.populate('categoria', 'nombre slug');
    return res.status(201).json(producto);
  } catch (error) {
    return next(error);
  }
}

export async function actualizarProducto(req, res, next) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de producto no es válido.' });
  }

  const { nombre, descripcion, precio, imagenUrl, stock, categoria, activo } = req.body ?? {};

  try {
    if (categoria && (!idValido(categoria) || !(await Categoria.exists({ _id: categoria, activa: true })))) {
      return res.status(400).json({ ok: false, msg: 'Selecciona una categoría activa.' });
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, imagenUrl, stock, categoria, activo },
      { new: true, runValidators: true }
    ).populate('categoria', 'nombre slug');
    if (!producto) {
      return res.status(404).json({ ok: false, msg: 'El producto no existe.' });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return next(error);
  }
}

export async function eliminarProducto(req, res, next) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de producto no es válido.' });
  }

  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, msg: 'El producto no existe.' });
    }
    return res.status(200).json({ ok: true, msg: 'Producto eliminado.' });
  } catch (error) {
    return next(error);
  }
}
