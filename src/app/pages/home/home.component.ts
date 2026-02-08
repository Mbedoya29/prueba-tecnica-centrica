import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSearchComponent } from '../../shared/components/customer-search/customer-search.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CustomerSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public cartService = inject(CartService);

  products = [
    { id: 1, name: 'Laptop Pro', price: 2500 },
    { id: 2, name: 'Mouse Gamer', price: 150 },
    { id: 3, name: 'Teclado Mecánico', price: 300 },
    { id: 4, name: 'Monitor 4K', price: 800 }
  ];

  addToCart(product: any) {
    const productToAdd = { ...product, id: Date.now() + Math.random() }; 
    this.cartService.addItem(productToAdd);
  }
}