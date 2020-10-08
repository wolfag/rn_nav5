import React from 'react';
import {Button, Text, View, Alert} from 'react-native';
import styles from '../common/styles';

const ExploreScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
      <Button
        title="Click Here"
        onPress={() => Alert.alert('Button Clicked!')}
      />
    </View>
  );
};

export default ExploreScreen;
