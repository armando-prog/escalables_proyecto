import mongoose from 'mongoose';

const direccionEnvioSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
      index: true
    },
    alias: { type: String, trim: true, maxlength: 60, default: 'Casa' },
    calle: { type: String, required: true, trim: true, maxlength: 120 },
    numeroExterior: { type: String, required: true, trim: true, maxlength: 20 },
    colonia: { type: String, required: true, trim: true, maxlength: 100 },
    codigoPostal: { type: String, required: true, trim: true, maxlength: 12 },
    ciudad: { type: String, required: true, trim: true, maxlength: 100 },
    estado: { type: String, required: true, trim: true, maxlength: 100 },
    pais: { type: String, required: true, trim: true, maxlength: 100, default: 'México' },
    referencia: { type: String, trim: true, maxlength: 300, default: '' },
    predeterminada: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const DireccionEnvio = mongoose.model('DireccionEnvio', direccionEnvioSchema);
