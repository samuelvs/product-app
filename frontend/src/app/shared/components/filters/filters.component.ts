import { Component, output, signal } from '@angular/core';
import { debounceTime, Subject, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFilter } from '../../interfaces/product-filter.interface';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  handleFilter = output<ProductFilter>();

  categories: string[] = ["Eletrônicos", "Eletrodomésticos", "Móveis", "Casa", "Esportes", "Moda", "Brinquedos", "Beleza", "Livros"];
  filters = signal<ProductFilter>({
    search: '',
    category: '',
    priceMin: null,
    priceMax: null
  });

  private filterSubject = new Subject<void>();

  ngOnInit() { 
    this.filterSubject.pipe(
      debounceTime(300),
      tap(() => this.handleFilter.emit(this.filters()))
    ).subscribe();
  }

  applyFilters() {
    this.filterSubject.next();
  }
}
