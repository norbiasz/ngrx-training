import { createAction, createReducer, on } from "@ngrx/store";

export interface UserState {
  maskUserName: boolean;
}

export const userReducer = createReducer(
  { maskUserName: true },
  on(createAction('[USER] Mask User Name'), state => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
);
