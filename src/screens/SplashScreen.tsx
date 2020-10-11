import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import logoImg from '../assets/logo.png';
import commonStyles from '../common/styles';

const {height} = Dimensions.get('screen');
const heightLogo = height * 0.28;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <View style={commonStyles.containerBg}>
      <StatusBar backgroundColor="#009387" />
      <View style={styles.header}>
        <Animatable.Image
          source={logoImg}
          style={styles.logo}
          resizeMode="stretch"
          animation="bounceIn"
          duration={1500}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {backgroundColor: colors.background}]}>
        <Text style={[styles.title, {color: colors.text}]}>
          Stay connected with everyone!
        </Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: heightLogo,
    height: heightLogo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
