import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import fetchAccessToken from "./naverAuth";

const NaverLogin = ({ route }) => {
  const { code } = route.params; // 네이버 인증 후 받은 인증 코드
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await fetchAccessToken(code); // naverAuth.js의 함수 호출
        setToken(token); // 토큰 상태에 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [code]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.text}>로그인 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>오류 발생: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인 성공!</Text>
      <Text style={styles.tokenText}>Access Token: {token}</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  tokenText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});

export default NaverLogin;
