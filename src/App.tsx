// In App.js in a new project

import AsyncStorage from '@react-native-community/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {AuthContext} from './components/context';
import {UserType} from './models/users';
import RootDrawer from './routes/RootDrawer';
import RootStackScreen from './routes/RootStackScreen';

const TYPES = {
  RETRIEVE_TOKEN: 'RETRIEVE_TOKEN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  TOGGLE_THEME: 'TOGGLE_THEME',
};

type ActionType = {
  type: string;
  payload: any;
};

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

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#fff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authReducer = (prevState: AuthStateType, action: ActionType) => {
    switch (action.type) {
      case TYPES.RETRIEVE_TOKEN:
        return {
          ...prevState,
          userToken: action.payload.userToken,
          isLoading: false,
        };
      case TYPES.LOGIN:
        return {
          ...prevState,
          username: action.payload.username,
          userToken: action.payload.userToken,
          isLoading: false,
        };
      case TYPES.LOGOUT:
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case TYPES.REGISTER:
        return {
          ...prevState,
          username: action.payload.username,
          userToken: action.payload.userToken,
          isLoading: false,
        };
    }
  };

  const [authState, dispatch] = React.useReducer(authReducer, initialAuthState);

  const authContext = React.useMemo(
    () => ({
      login: async (user: UserType) => {
        const {userToken, username} = user;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log({error});
        }
        dispatch({type: TYPES.LOGIN, payload: {username, userToken}});
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log({error});
        }
        dispatch({type: TYPES.LOGOUT});
      },
      register: async () => {},
      toggleTheme: async () => {
        setIsDarkTheme((_isDarkTheme) => !_isDarkTheme);
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log({userToken});
      } catch (error) {
        console.log({error});
      }
      dispatch({type: TYPES.RETRIEVE_TOKEN, payload: {userToken}});
    }, 1000);
  }, []);

  if (authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log({authState});
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {authState.userToken ? <RootDrawer /> : <RootStackScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
