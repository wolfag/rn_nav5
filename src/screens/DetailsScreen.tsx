import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styles from '../common/styles';
import {Text, View, Button} from 'react-native';

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to details screen...again"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Go to home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
