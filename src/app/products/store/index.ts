import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export interface State extends AppState.State {
  // komponent products jest wczytywany jako Lazy Loadin
  // dlatego rozszeszamy nasz global state app.state.ts
  // o State z ProductState
  products: ProductState;
}

// deklaracja stalej dla Feature Selector'a (nie exportujemy jej)
const getProductFeatureState = createFeatureSelector<ProductState>('products');
// utworzenie selektora dla konkretnej właściwości (exportujemy)
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);




export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
