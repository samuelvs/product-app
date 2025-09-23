import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product/product-list/product-list';
import { ProductGridComponent } from './pages/product/product-grid/product-grid';
import { ProductFormComponent } from './pages/product/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductGridComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];
