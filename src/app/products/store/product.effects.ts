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

  createProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.createProduct),
        concatMap(action =>
          this.productService.createProduct(action.product)
            .pipe(
              map(product => ProductApiActions.createProductSuccess({ product })),
              catchError(error => of(ProductApiActions.createProductFailure({ error })))
            )
        )
      );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.deleteProduct),
        mergeMap(action =>
          this.productService.deleteProduct(action.productId).pipe(
            map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
          )
        )
      );
  });

}
