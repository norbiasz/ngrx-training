import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductPageActions, ProductApiActions } from './actions';

// Effects działają jak serwisy
// dlatego dodajemy poniższy dekorator
@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) { }

  // createEffect metda NgRX do tworzenia effect
  loadProducts$ = createEffect(() => {
    // actions$ <- posiada wszytkie zadeklarowane akcje
    return this.actions$.pipe(
      // ofType <- wskazujemy na tą właściwą
      ofType(ProductPageActions.loadProducts),
      // strzał po dane
      mergeMap(() => this.productService.getProducts()
        .pipe(
          // wskazanie na akcję która zrobi dispatch pobranych danych do store
          map(products => ProductApiActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
        ))
    );
  });

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap(action => this.productService.updateProduct(action.product)
        .pipe(
          map(product => ProductApiActions.updateProductSuccess({ product })),
          catchError(error => of(ProductApiActions.updateProductFailure({ error })))
        ))
    );
  });

}
