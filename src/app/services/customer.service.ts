import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  
  private customers: Customer[] = [
    { id: 1, name: 'Santiago Ramírez' },
    { id: 2, name: 'Sebastián Ospina' },
    { id: 3, name: 'Carlos Andrés Ruiz' },
    { id: 4, name: 'Carolina Pérez' },
    { id: 5, name: 'Camilo Duarte' },
    { id: 6, name: 'Daniela Castro' },
    { id: 7, name: 'Carlota Herrera' },
    { id: 8, name: 'Laura Rodríguez' },
    { id: 9, name: 'Luis Fernando Mejía' },
    { id: 10, name: 'Ana Sofía Vargas' }
  ];

  search(term: string): Observable<Customer[]> {
    if (!term.trim()) return of([]);

    const results = this.customers.filter(customer => 
      customer.name.toLowerCase().includes(term.toLowerCase())
    );

    return of(results).pipe(delay(500));
  }
}