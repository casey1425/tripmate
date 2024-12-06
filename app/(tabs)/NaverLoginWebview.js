import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import axios from 'axios';

const NaverLoginWebView = ({ navigation }) => {
  const CLIENT_ID = "BSDKxMEk3jWzgK4iiTk1"; // 네이버에서 발급받은 client_id
  const REDIRECT_URI = "http://localhost:8081/callback"; // 리디렉션 URI

  // 액세스 토큰을 요청하는 함수
  const fetchAccessToken = async (code) => {
    const CLIENT_SECRET = "dEkL8sMqEy"; // 네이버에서 발급받은 client_secret
    const url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code=${code}`;
    
    try {
      const response = await axios.get(url);
      console.log("Access Token Response:", response.data);
      // 액세스 토큰 처리
      const accessToken = response.data.access_token;
      // 여기에 토큰을 저장하거나 다음 작업을 진행
    } catch (error) {
      console.error("Failed to fetch access token:", error);
    }
  };

  const onNavigationStateChange = (event) => {
    if (event.url.startsWith(REDIRECT_URI)) {
      const code = event.url.split('code=')[1]; // URL에서 인증 코드 추출
      if (code) {
        // 인증 코드로 액세스 토큰 요청
        fetchAccessToken(code);
        navigation.navigate('Home');  // 로그인 후 홈 화면으로 이동
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
        }}
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
      />
    </View>
  );
};

export default NaverLoginWebView;
