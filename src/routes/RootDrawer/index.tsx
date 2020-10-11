import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import MainTabScreen from '../MainTabScreen';
import BookmarkScreen from '../../screens/BookmarkScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import SupportScreen from '../../screens/SupportScreen';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const RootDrawer: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
