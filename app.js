import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage'; // 로그인 페이지
import NaverLoginWebView from './NaverLoginWebView'; // 네이버 로그인 페이지

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="NaverLoginWebView" component={NaverLoginWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
