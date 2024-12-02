import React, { useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";

const NaverLoginWebView = ({ navigation }) => {
  const webviewRef = useRef(null);

  // 네이버 로그인 URL 설정
  const clientId = "BSDKxMEk3jWzgK4iiTk1"; // 네이버에서 발급받은 Client ID
  const redirectUri = "http://localhost:8081/callback"; // 네이버 개발자센터에서 등록한 Redirect URI
  const state = "RANDOM_STATE"; // CSRF 방지용 상태값
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}`;

  // WebView Navigation State Change Handler
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;

    // Redirect URI에 인증 코드가 포함되었는지 확인
    if (url.includes("code=")) {
      const code = url.split("code=")[1].split("&")[0];
      Alert.alert("Naver Login Successful", `Authorization Code: ${code}`);
      
      // 여기에서 백엔드로 코드 전송 로직을 추가
      navigation.goBack(); // 로그인 성공 후 이전 화면으로 돌아감
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: naverLoginUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NaverLoginWebView;
