import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, finalize } from 'rxjs';

export interface Categoria {
  _id: string;
  nombre: string;
  slug: string;
  descripcion: string;
}

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  stock: number;
  categoria: Categoria | null;
}

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api';

  readonly productos = signal<Producto[]>([]);
  readonly categorias = signal<Categoria[]>([]);
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly buscar = signal('');
  readonly categoriaActiva = signal<string | null>(null);

  readonly productosVisibles = computed(() => {
    const texto = this.buscar().trim().toLocaleLowerCase();
    const categoriaId = this.categoriaActiva();

    return this.productos().filter((producto) => {
      const coincideCategoria = !categoriaId || producto.categoria?._id === categoriaId;
      const contenido = `${producto.nombre} ${producto.descripcion}`.toLocaleLowerCase();
      return coincideCategoria && (!texto || contenido.includes(texto));
    });
  });

  cargarCatalogo(): void {
    this.cargando.set(true);
    this.error.set(null);

    forkJoin({
      productos: this.http.get<Producto[]>(`${this.apiUrl}/productos`),
      categorias: this.http.get<Categoria[]>(`${this.apiUrl}/categorias`)
    })
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: ({ productos, categorias }) => {
          this.productos.set(productos);
          this.categorias.set(categorias);
        },
        error: (error: unknown) => this.error.set(this.mensajeDeError(error))
      });
  }

  private mensajeDeError(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'No se pudo conectar con la tienda. Revisa que la API y MongoDB estén iniciados.';
    }

    if (
      error instanceof HttpErrorResponse &&
      typeof error.error === 'object' &&
      error.error !== null &&
      'msg' in error.error &&
      typeof error.error.msg === 'string'
    ) {
      return error.error.msg;
    }

    return 'No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.';
  }
}
