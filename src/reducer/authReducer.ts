import {Types, ActionMap} from './index';

type AuthPayload = {
  [Types.LOGIN]: {username: string; userToken: string};
  [Types.LOGOUT]: {};
  [Types.REGISTER]: {};
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export type AuthStateType = {
  isLoading: boolean;
  username: string | null;
  userToken: string | null;
};

export const initialAuthState: AuthStateType = {
  isLoading: true,
  username: null,
  userToken: null,
};

export const authReducer = (state: AuthStateType, action: AuthActions) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        username: action.payload.username,
        userToken: action.payload.userToken,
      };
    case Types.LOGOUT:
      return {
        ...state,
        username: null,
        userToken: null,
      };
  }
};
