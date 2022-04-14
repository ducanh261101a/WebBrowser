import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import React from 'react';
// import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SplashScreen from '../screens/SplashScreens/SplashScreen';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import InfoMovieScreen from '../screens/InfoMovieScreen/InfoMovieScreen';

export type AppStackParams = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  InfoMovieScreen: {idMovie: string};
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: () => null}}
        initialRouteName="SplashScreen">
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="InfoMovieScreen" component={InfoMovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
