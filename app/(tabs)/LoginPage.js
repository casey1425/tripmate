import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 처리 로직 (백엔드 연동 필요)
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Title.png")}
        style={styles.logo}
        resizeMode="contain" // 이미지가 잘리지 않도록 설정
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: "80%", // 화면의 80% 크기로 조정
    height: 75, // 이미지 비율에 맞춰 높이 설정
    marginBottom: 40, // 이미지와 입력 필드 사이 여백
    alignSelf: "center", // 중앙 정렬
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black", // 버튼 배경색 검정
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5, // 둥근 모서리
  },
  buttonText: {
    color: "white", // 글씨 색 흰색
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: "blue",
  },
});

export default LoginPage;
