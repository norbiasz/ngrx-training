import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { productReducer } from './store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    // 1 arg. nazwa state slice
    // 2 arg. reducer, lub zestaw reducerów
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
