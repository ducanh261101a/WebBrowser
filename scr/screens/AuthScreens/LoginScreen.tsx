import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../navigations/index';

type Props = NativeStackScreenProps<AppStackParams, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
    navigation.replace('HomeScreen');
  };

  return (
    <View>
      <Text>Day la man Login :v</Text>
      <TouchableOpacity style={styles.btn} onPress={handleClick}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
});
