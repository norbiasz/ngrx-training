import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction(
  '[Product Page] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  // poprs <- dostarczamy metadane
  // dotyczące wybranego produktu
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize Current Product'
);

export const loadProducts = createAction(
  '[Product Page] Load'
);

export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ product: Product }>()
);

