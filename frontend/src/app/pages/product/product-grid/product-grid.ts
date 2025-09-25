import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ProductFilter } from '../../../shared/interfaces/product-filter.interface';
import { FiltersComponent } from "../../../shared/components/filters/filters.component";

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    PaginationComponent,
    FiltersComponent
],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
})
export class ProductGridComponent implements OnInit {
  products = signal<Product[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(12);
  totalItems = signal(0);
  filters = signal<ProductFilter | undefined>(undefined);

  constructor(private productService: ProductService) {}
  
  ngOnInit() { 
    this.handleFilter(undefined, this.currentPage());
  }

  handleFilter(filters?: ProductFilter, page: number = 1) {     
    this.filters.set(filters);
    this.productService.list(filters, page, this.itemsPerPage()).subscribe((res: any) => {
      this.products.set(res.results || []);
      this.totalItems.set(res.count || (res.results?.length || 0));
      this.currentPage.set(page);
    });
  }

  onPageChange(page: number) {    
    this.currentPage.set(page);
    this.handleFilter(this.filters(), page);    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}