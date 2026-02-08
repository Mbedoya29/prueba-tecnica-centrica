import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private _items = signal<Product[]>([]);
  public readonly items = this._items.asReadonly();
  public totalCount = computed(() => this.items().length);
  
  public totalPrice = computed(() => {
    return this.items().reduce((acc, product) => acc + product.price, 0);
  });

  constructor() {
    effect(() => {
      const count = this.totalCount();
      const total = this.totalPrice();
      console.log(`[Carrito] Cambio detectado. Items: ${count}, Total: $${total}`);
    });
  }

  addItem(product: Product): void {
    this._items.update(currentItems => [...currentItems, product]);
  }

  clearCart(): void {
    this._items.set([]);
  }
}