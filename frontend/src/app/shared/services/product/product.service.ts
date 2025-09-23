import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductFilter } from '../../interfaces/product-filter.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  base = '/api/products/';

  constructor(private http: HttpClient) {}
  
  list(filters?: ProductFilter, page: number = 1, pageSize: number = 10): Observable<any> {
    let params: any = { 
      page: page.toString(),
      page_size: pageSize.toString()
    };
  
    if (filters) {
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.priceMin != null) params.price_min = filters.priceMin;
      if (filters.priceMax != null) params.price_max = filters.priceMax;
    }
  
    return this.http.get<any>(this.base, { params });
  }

  get(id: number) { return this.http.get<Product>(`${this.base}${id}/`); }
  create(formData: FormData) { return this.http.post<Product>(this.base, formData); }
  update(id: number, formData: FormData) { return this.http.put<Product>(`${this.base}${id}/`, formData); }
  delete(id: number) { return this.http.delete(`${this.base}${id}/`); }
}
