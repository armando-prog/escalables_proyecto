import mongoose from 'mongoose';

const itemPedidoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    nombre: { type: String, required: true, trim: true },
    precioUnitario: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
      index: true
    },
    direccion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DireccionEnvio',
      required: true
    },
    productos: {
      type: [itemPedidoSchema],
      required: true,
      validate: {
        validator: (productos) => productos.length > 0,
        message: 'El pedido debe incluir al menos un producto.'
      }
    },
    subtotal: { type: Number, required: true, min: 0 },
    costoEnvio: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    estado: {
      type: String,
      enum: ['pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado'],
      default: 'pendiente',
      required: true
    }
  },
  { timestamps: true }
);

export const Pedido = mongoose.model('Pedido', pedidoSchema);
