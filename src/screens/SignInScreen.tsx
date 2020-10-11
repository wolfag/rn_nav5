import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  Alert,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AuthContext} from '../components/context';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Users, UserType} from '../models/users';
import commonStyles from '../common/styles';

interface DataProps {
  username?: string;
  password?: string;
  checkUsernameChange: boolean;
  secureTextEntry: boolean;
  isValidUser: boolean;
  isValidPassword: boolean;
}

const SignInScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<DataProps>({
    username: '',
    password: '',
    checkUsernameChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();

  const {login} = useContext(AuthContext);

  const handleUsernameChange = (val?: string) => {
    const newData = {...data};
    newData.username = val;
    if ((val?.trim?.()?.length || 0) >= 4) {
      newData.checkUsernameChange = true;
      newData.isValidUser = true;
    } else {
      newData.checkUsernameChange = false;
      newData.isValidUser = false;
    }
    setData(newData);
  };

  const handlePasswordChange = (val?: string) => {
    const newData = {...data};
    newData.password = val;
    if ((val?.trim?.().length || 0) >= 8) {
      newData.isValidPassword = true;
    } else {
      newData.isValidPassword = false;
    }
    setData(newData);
  };

  const toggleSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const newData = {...data};
    if (event.nativeEvent.text?.trim?.()?.length || 0 >= 4) {
      newData.isValidUser = true;
    } else {
      newData.isValidUser = false;
    }
    setData(newData);
  };

  const validate = () => {
    const {username, password} = data;
    if (username?.length === 0 || password?.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return false;
    }
    return true;
  };

  const loginHandle = (username?: string, password?: string) => {
    if (validate()) {
      const user: UserType | undefined = Users.find(
        (u) => username === u.username && password === u.password,
      );
      if (user) {
        login(user);
      }
    }
  };

  return (
    <View style={commonStyles.containerBg}>
      <StatusBar
        backgroundColor={commonStyles.containerBg.backgroundColor}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {backgroundColor: colors.background}]}>
        <Text style={[styles.textFooter, {color: colors.text}]}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[styles.textInput, {color: colors.text}]}
            autoCapitalize="none"
            onChangeText={handleUsernameChange}
            onEndEditing={handleValidUser}
          />
          {data.checkUsernameChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text style={[styles.textFooter, {color: colors.text, marginTop: 35}]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, {color: colors.text}]}
            autoCapitalize="none"
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{color: '#009387', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[styles.signIn, styles.signUp]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
  },
  errorMsg: {
    color: '#ff0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUp: {
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
  },
});
