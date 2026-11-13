import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI no está configurada.');
  }

  await mongoose.connect(uri);
  console.log('Conectado a MongoDB.');
}
