import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent {

  private customerService: CustomerService = inject(CustomerService);
  
  searchControl = new FormControl('', { nonNullable: true });
  
  results$: Observable<Customer[]>;

  constructor() {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((term: string) => term.length >= 3 || term.length === 0),
      switchMap((term: string) => {
        if (term.length === 0) {
          return of([]);
        }
        return this.customerService.search(term);
      })
    );
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}