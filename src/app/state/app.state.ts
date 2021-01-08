import { UserState } from './../user/user/user.reducer';

export interface State {
  // user <- nazwa feture slice
  // UserState <- interface stworzony w user.reducer.ts
  user: UserState;
}
