import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../navigations/index';

type Props = NativeStackScreenProps<AppStackParams, 'SplashScreen'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Image
          source={require('../../assets/images/webbrowser_logo.png')}
          style={{width: 250, height: 250}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
