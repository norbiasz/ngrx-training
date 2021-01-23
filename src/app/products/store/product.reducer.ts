import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
  // komponent products jest wczytywany jako Lazy Loadin
  // dlatego rozszeszamy nasz global state app.state.ts
  // o State z ProductState
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

// deklaracja stalej dla Feature Selector'a (nie exportujemy jej)
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// utworzenie selektora dla konkretnej właściwości (exportujemy)
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export const productReducer = createReducer<ProductState>(
  // { showProductCode: true } as ProductState,
  initialState,
  // on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: 'test',
        productCode: 'test',
        description: 'test',
        starRating: 0
      }
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  })
);

