import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TripsProvider } from "./(tabs)/TripsContext";
import { Ionicons } from "@expo/vector-icons";

// 스크린 컴포넌트 가져오기
import IntroPage from "./(tabs)/IntroPage";
import HomeScreen from "./(tabs)/HomeScreen";
import SpendingScreen from "./(tabs)/SpendingScreen";
import PlanningScreen from "./(tabs)/PlanningScreen";
import LoginPage from "./(tabs)/LoginPage";
import SignupPage from "./(tabs)/SignupPage";
import ForgotPassword from "./(tabs)/ForgotPassword";
import SearchPage from "./(tabs)/SearchPage";
import { FavoritesProvider } from "./(tabs)/FavoritesContext";
import FavsPage from "./(tabs)/FavsPage";
import NotifPage from "./(tabs)/NotifPage";
import SetupPage from "./(tabs)/SetupPage";
import Setup2 from "./(tabs)/Setup2";
import Setup3 from "./(tabs)/Setup3";
import Setup4 from "./(tabs)/Setup4";
import { Text, View } from "react-native";
// 네비게이터 생성
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// **탭 네비게이터**
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Ionicons의 name 속성과 같은 타입으로 설정
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = "help-circle-outline"; // 기본값
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={color}
              style={{ marginBottom: -3 }}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#f8f8f8", // 탭 배경 색상
          borderTopWidth: 1, // 상단 테두리 두께
          borderTopColor: "#e0e0e0", // 상단 테두리 색상
          height: 80, // 탭 높이
          paddingVertical: 5, // 위아래 패딩
        },
        tabBarLabelStyle: {
          fontSize: 16, // 텍스트 크기
          fontWeight: "600", // 텍스트 굵기
          marginTop: 4, // 텍스트 위치 조정
        },
        tabBarIconStyle: {
          marginBottom: 1, // 아이콘 위치 조정
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{ title: "검색" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavsPage}
        options={{ title: "즐겨찾기" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotifPage}
        options={{ title: "알림" }}
      />
      <Tab.Screen
        name="Settings"
        component={SetupPage}
        options={{ title: "설정" }}
      />
    </Tab.Navigator>
  );
}

// **스택 네비게이터**
export default function App() {
  return (
    <FavoritesProvider>
      <TripsProvider>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
        {/* 인트로 및 인증 화면 */}
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
          options={{ title: "SignupScreen" }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{ title: "ForgotPasswordScreen" }}
        />

        {/* 메인 화면 (탭 네비게이터 포함) */}
        <Stack.Screen
          name="Home"
          component={TabNavigator} // 탭 네비게이터 포함
          options={{ title: "Main Screens" }}
        />

        {/* 기타 추가 화면 */}
        <Stack.Screen
          name="Spending"
          component={SpendingScreen}
          options={{ title: "SpendingScreen" }}
        />
        <Stack.Screen
          name="Planning"
          component={PlanningScreen}
          options={{ title: "PlanningScreen" }}
        />
        <Stack.Screen
          name="Setup2"
          component={Setup2}
          options={{ title: "Setup2" }}
        />
        <Stack.Screen
          name="Setup3"
          component={Setup3}
          options={{ title: "Setup3" }}
        />
        <Stack.Screen
          name="Setup4"
          component={Setup4}
          options={{ title: "Setup4" }}
        />
        </Stack.Navigator>
      </TripsProvider>
    </FavoritesProvider>
  );
}
