// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import MainTabScreen from './src/routes/MainTabScreen';

function App() {
  return (
    <NavigationContainer>
      <MainTabScreen />
    </NavigationContainer>
  );
}

export default App;
