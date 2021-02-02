import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getShowProductCode, getCurrentProduct, State, getProducts, getError } from 'src/app/products/store';
import { Product } from '../product';
import { ProductPageActions } from '../store/actions';
@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // Akcja zostanie odebrana przez effect
    // a następnie dodane zostaną produkty do store
    this.store.dispatch(ProductPageActions.loadProducts());
    // Pobranie pdoduktów
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    // pobranie danych z selektora
    // this.store.select(getShowProductCode).subscribe(
    //   showProductCode => this.displayCode = showProductCode
    // );
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    // this.store.dispatch(
    //   {
    //     type: '[Product] Toggle Product Code'
    //   }
    // );
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
