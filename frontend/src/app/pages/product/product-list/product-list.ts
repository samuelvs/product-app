import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { DocxService } from '../../../shared/services/docx/docx.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from "../../../shared/components/filters/filters.component";
import { ProductFilter } from '../../../shared/interfaces/product-filter.interface';
import { BarChartComponent } from "../../../shared/components/bar-chart/bar-chart.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FiltersComponent, BarChartComponent, PaginationComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalItems = signal(0);
  filters = signal<ProductFilter | undefined>(undefined);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private docxService: DocxService
  ) {}

  ngOnInit() { 
    this.load();
  }

  load(filters?: ProductFilter) {
    this.handleFilter(filters, this.currentPage());
  }

  handleFilter(filters?: ProductFilter, page: number = 1) {   
    this.filters.set(filters);
    this.productService.list(filters, page, this.itemsPerPage()).subscribe((res: any) => {
      this.products.set(res.results || []);
      this.totalItems.set(res.count || (res.results?.length || 0));
      this.currentPage.set(page);
    });
  }

  handleItemsPerPage(page: number) {
    this.itemsPerPage.set(page);
    this.currentPage.set(1);
    this.load();
  }

  deleteProd(id: number) {
    if (!confirm('Confirma exclusão?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }

  generateReport() {
    const data = {
      title: 'Relatório de Produtos',
      generated_at: new Date().toLocaleString(),
      products: this.products().map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category, stock: p.stock }))
    };
    
    if (isPlatformBrowser(this.platformId)) {
      this.docxService.generate('/assets/templates/product_report.docx', data, 'produtos.docx');
    }
  }
}