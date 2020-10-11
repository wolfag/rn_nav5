import React from 'react';
import {AuthStateType, initialAuthState} from '../App';

export const AuthContext = React.createContext<{
  state: AuthStateType;
  dispatch: React.Dispatch<any>;
}>({state: initialAuthState, dispatch: () => null});
