import mongoose from 'mongoose';
import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';

export async function listarCategorias(_req, res, next) {
  try {
    const categorias = await Categoria.find({ activa: true }).sort({ nombre: 1 });
    return res.status(200).json(categorias);
  } catch (error) {
    return next(error);
  }
}

export async function listarTodasLasCategorias(_req, res, next) {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    return res.status(200).json(categorias);
  } catch (error) {
    return next(error);
  }
}

export async function obtenerCategoria(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de categoría no es válido.' });
  }

  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ ok: false, msg: 'La categoría no existe.' });
    }
    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
}

export async function crearCategoria(req, res, next) {
  const { nombre, slug, descripcion } = req.body ?? {};

  try {
    const categoria = await Categoria.create({ nombre, slug, descripcion });
    return res.status(201).json(categoria);
  } catch (error) {
    return next(error);
  }
}

export async function actualizarCategoria(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de categoría no es válido.' });
  }

  const { nombre, slug, descripcion, activa } = req.body ?? {};

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre, slug, descripcion, activa },
      { new: true, runValidators: true }
    );
    if (!categoria) {
      return res.status(404).json({ ok: false, msg: 'La categoría no existe.' });
    }
    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
}

export async function eliminarCategoria(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ ok: false, msg: 'El identificador de categoría no es válido.' });
  }

  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ ok: false, msg: 'La categoría no existe.' });
    }

    if (await Producto.exists({ categoria: categoria._id })) {
      return res.status(409).json({
        ok: false,
        msg: 'No se puede eliminar una categoría que todavía tiene productos.'
      });
    }

    await categoria.deleteOne();
    return res.status(200).json({ ok: true, msg: 'Categoría eliminada.' });
  } catch (error) {
    return next(error);
  }
}
