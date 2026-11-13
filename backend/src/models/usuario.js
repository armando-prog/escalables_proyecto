import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    apellidos: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    rol: {
      type: String,
      enum: ['cliente', 'admin'],
      default: 'cliente',
      required: true
    }
  },
  { timestamps: true }
);

usuarioSchema.pre('save', async function () {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
});

usuarioSchema.methods.compararPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

usuarioSchema.set('toJSON', {
  transform(_document, returnedObject) {
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
    return returnedObject;
  }
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);
