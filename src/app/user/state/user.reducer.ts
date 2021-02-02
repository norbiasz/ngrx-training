import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './user.actions';
export interface UserState {
  maskUserName: boolean;
}

const initialStateUser: UserState = {
  maskUserName: false
};

// deklaracja stalej dla Feature Selector'a (nie exportujemy jej)
const getUserFeatureState = createFeatureSelector<UserState>('user');
// utworzenie selektora dla konkretnej właściwości (exportujemy)
export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);



export const userReducer = createReducer<UserState>(
  initialStateUser,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
);
