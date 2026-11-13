import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogoService, Producto } from './catalogo.service';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly catalogo = inject(CatalogoService);
  protected readonly productoSeleccionado = signal<Producto | null>(null);

  constructor() {
    this.catalogo.cargarCatalogo();
  }

  protected abrirProducto(producto: Producto): void {
    this.productoSeleccionado.set(producto);
  }

  protected cerrarProducto(): void {
    this.productoSeleccionado.set(null);
  }

  @HostListener('document:keydown.escape')
  protected cerrarConEscape(): void {
    this.cerrarProducto();
  }
}
