import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { fetchAccessToken } from "../views/naverAuth"; // 경로는 프로젝트 구조에 따라 변경

const NaverLoginPage = () => {
  const [showWebView, setShowWebView] = useState(false);

  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;

    if (url.includes("code=")) {
      const code = url.split("code=")[1].split("&")[0]; // 인증 코드 추출
      setShowWebView(false); // WebView 닫기
      try {
        const token = await fetchAccessToken(code); // 액세스 토큰 요청
        Alert.alert("로그인 성공", `Access Token: ${token}`);
      } catch (error) {
        Alert.alert("에러", "Access Token 요청 실패");
      }
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=RANDOM_STATE`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => setShowWebView(true)}
        >
          <Text style={styles.loginButtonText}>네이버 로그인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#03c75a",
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NaverLoginPage;
