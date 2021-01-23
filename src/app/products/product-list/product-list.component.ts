import { getProducts } from './../store/product.reducer';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { getShowProductCode, getCurrentProduct, State } from 'src/app/products/store/product.reducer';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../store/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  // displayCode: boolean;

  // products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    this.selectedProduct$ = this.store.select(getCurrentProduct)

    // pobranie danych z selektora
    // this.store.select(getShowProductCode).subscribe(
    //   showProductCode => this.displayCode = showProductCode
    // );
    this.displayCode$ = this.store.select(getShowProductCode);


    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    // Akcja zostanie odebrana przez effect
    // a następnie dodane zostaną produkty do store
    this.store.dispatch(ProductActions.loadProducts());
    // Pobranie pdoduktów
    this.products$ = this.store.select(getProducts);

    // this.store.select('products').subscribe(
    //   products => {
    //     // mamy wprowadzony do reducera obiekt iniclalizujący
    //     // dlatego możemy usubąć instrukcję if
    //     if (products) {
    //       this.displayCode = products.showProductCode;
    //     }
    //   }
    // );

  }

  checkChanged(): void {
    // this.store.dispatch(
    //   {
    //     type: '[Product] Toggle Product Code'
    //   }
    // );
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

}
