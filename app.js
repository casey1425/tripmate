import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./screens/LoginPage";
import NaverLoginPage from "./screens/NaverLoginPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="NaverLogin" component={NaverLoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
