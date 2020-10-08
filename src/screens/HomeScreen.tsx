import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import styles from '../common/styles';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
