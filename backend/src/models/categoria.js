import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 80
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 300,
      default: ''
    },
    activa: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Categoria = mongoose.model('Categoria', categoriaSchema);
