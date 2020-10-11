import {Types, ActionMap} from './index';

type MainPayload = {
  [Types.TOGGLE_THEME]: {};
};

export type MainActions = ActionMap<MainPayload>[keyof ActionMap<MainPayload>];

export type MainStateType = {
  isDark: boolean;
};

export const initialMainState: MainStateType = {
  isDark: false,
};

export const mainReducer = (state: MainStateType, action: MainActions) => {
  switch (action.type) {
    case Types.TOGGLE_THEME:
      return {
        ...state,
        isDark: !state.isDark,
      };
  }
};
