import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';

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
      ofType(ProductActions.loadProducts),
      // strzał po dane
      mergeMap(() => this.productService.getProducts()
        .pipe(
          // wskazanie na akcję która zrobi dispatch pobranych danych do store
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        ))
    );
  });
}
