import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product/product-list/product-list';
import { ProductGridComponent } from './pages/product/product-grid/product-grid';
import { ProductFormComponent } from './pages/product/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'busca', component: ProductGridComponent },
  { path: 'produtos/novo', component: ProductFormComponent },
  { path: 'produtos/:id/editar', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];
