import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';

const categoriasIniciales = [
  { nombre: 'Textiles', slug: 'textiles', descripcion: 'Piezas tejidas y textiles hechos a mano.' },
  { nombre: 'Cerámica', slug: 'ceramica', descripcion: 'Objetos de barro y cerámica artesanal.' },
  { nombre: 'Accesorios', slug: 'accesorios', descripcion: 'Detalles artesanales para llevar contigo.' }
];

const productosIniciales = [
  {
    nombre: 'Bolsa de telar',
    descripcion: 'Bolsa tejida a mano en telar, ligera y hecha en lotes pequeños.',
    precio: 480,
    stock: 8,
    slugCategoria: 'textiles'
  },
  {
    nombre: 'Taza de barro',
    descripcion: 'Taza de cerámica de acabado natural, cada pieza tiene variaciones únicas.',
    precio: 260,
    stock: 12,
    slugCategoria: 'ceramica'
  },
  {
    nombre: 'Monedero bordado',
    descripcion: 'Monedero compacto con bordado hecho a mano y cierre superior.',
    precio: 190,
    stock: 15,
    slugCategoria: 'textiles'
  },
  {
    nombre: 'Aretes de latón',
    descripcion: 'Aretes ligeros trabajados en latón por un taller local.',
    precio: 320,
    stock: 6,
    slugCategoria: 'accesorios'
  }
];

try {
  await connectDatabase(process.env.MONGODB_URI);

  for (const categoria of categoriasIniciales) {
    await Categoria.updateOne(
      { slug: categoria.slug },
      { $setOnInsert: categoria },
      { upsert: true }
    );
  }

  if ((await Producto.countDocuments()) === 0) {
    const categorias = await Categoria.find({ slug: { $in: productosIniciales.map((item) => item.slugCategoria) } });
    const categoriasPorSlug = new Map(categorias.map((categoria) => [categoria.slug, categoria._id]));

    await Producto.insertMany(
      productosIniciales.map(({ slugCategoria, ...producto }) => ({
        ...producto,
        categoria: categoriasPorSlug.get(slugCategoria)
      }))
    );
  }

  console.log('Catálogo de demostración listo.');
} catch (error) {
  console.error('No se pudo preparar el catálogo:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
