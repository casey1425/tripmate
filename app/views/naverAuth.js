import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:8081/callback";

const NaverAuth = ({ route }) => {
  const { code } = route.params; // 네이버 인증 후 받은 인증 코드
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&code=${code}`;

      try {
        const response = await axios.get(url);
        setToken(response.data.access_token);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, [code]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>로그인 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>로그인 성공!</Text>
      <Text>Access Token: {token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NaverAuth;
