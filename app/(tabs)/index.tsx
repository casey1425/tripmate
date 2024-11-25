import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import SpendingScreen from "./SpendingScreen";
import PlanningScreen from "./PlanningScreen";
import { TripsProvider } from "./TripsContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import IntroPage from "./IntroPage";
import ForgotPassword from "./ForgotPassword";
import NotifPage from "./NotifPage";
import SetupPage from "./SetupPage";
import SearchPage from "./SearchPage";
// import HomePage from './HomePage';
// import NotifPage from './NotifPage';
// import SetupPage from './SetupPage';
// import Setup2 from './Setup2';
// import Setup3 from './Setup3';
// import Setup4 from './Setup4';
const Stack = createStackNavigator();

export default function App() {
  return (
    <TripsProvider>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Stack.Screen
          name="Intro"
          component={IntroPage}
          options={{ title: "IntroScreen" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "LoginScreen" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ title: "LoginScreen" }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{ title: "ForgotPassword" }}
        />
        <Stack.Screen
          name="Notif"
          component={NotifPage}
          options={{ title: "Notif" }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupPage}
          options={{ title: "SetupPage" }}
        />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: "SearchPage" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="Spending"
          component={SpendingScreen}
          options={{ title: "Spending Screen" }}
        />
        <Stack.Screen
          name="Planning"
          component={PlanningScreen}
          options={{ title: "Planning Screen" }}
        />
      </Stack.Navigator>
    </TripsProvider>
  );
}
