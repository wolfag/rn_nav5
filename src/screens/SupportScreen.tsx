import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import styles from '../common/styles';

const SupportScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Support Screen</Text>
      <Button
        title="Click Here"
        onPress={() => Alert.alert('Button Clicked!')}
      />
    </View>
  );
};

export default SupportScreen;
