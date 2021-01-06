import { createFeatureSelector, createSelector } from '@ngrx/store';

const initialState: UserState = {
  maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state: UserState = initialState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}

export interface User {
  user: UserState;
}

export interface UserState {
  maskUserName: boolean;
}
