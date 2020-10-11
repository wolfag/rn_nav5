import React, {createContext, Dispatch, useReducer} from 'react';

import {
  authReducer,
  initialAuthState,
  AuthStateType,
  AuthActions,
} from '../reducer/authReducer';
import {
  mainReducer,
  initialMainState,
  MainStateType,
  MainActions,
} from '../reducer/mainReducer';

type InitialStateType = {
  auth: AuthStateType;
  main: MainStateType;
};

const initialState = {
  auth: initialAuthState,
  main: initialMainState,
};

const rootReducer = (
  {auth, main}: InitialStateType,
  action: AuthActions | MainActions,
) => ({
  auth: authReducer(auth, action),
  main: mainReducer(main, action),
});

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
