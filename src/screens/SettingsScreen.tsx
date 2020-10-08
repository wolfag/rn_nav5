import React from 'react';
import {Button, Text, View, Alert} from 'react-native';
import styles from '../common/styles';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Click Here"
        onPress={() => Alert.alert('Button Clicked!')}
      />
    </View>
  );
};

export default SettingsScreen;
