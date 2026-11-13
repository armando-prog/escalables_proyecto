import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500
    },
    precio: {
      type: Number,
      required: true,
      min: 0.01
    },
    imagenUrl: {
      type: String,
      trim: true,
      default: ''
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },
    activo: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Producto = mongoose.model('Producto', productoSchema);
