import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [showWebView, setShowWebView] = useState(false); // 웹뷰 표시 상태 관리

  const CLIENT_ID = "BSDKxMEk3jWzgK4iiTk1";
  const REDIRECT_URI = "http://localhost:8081/callback";
  const STATE = Math.random().toString(36).substr(2);

  const handleSignup = () => {
    // 회원가입 처리 로직 (백엔드 연동 필요)
  };

  const handleNaverLogin = () => {
    setShowWebView(true); // WebView 표시
  };

  const onNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.startsWith(REDIRECT_URI)) {
      setShowWebView(false); // WebView 숨김
      const params = new URLSearchParams(url.split("?")[1]);
      const code = params.get("code");
      const state = params.get("state");
      console.log("Auth Code:", code, "State:", state);

      // 여기서 토큰 요청 로직 추가 가능
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
              REDIRECT_URI
            )}&state=${STATE}`,
          }}
          onNavigationStateChange={onNavigationStateChange}
          style={{ flex: 1 }}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/Title.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={name}
            onChangeText={setName}
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
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View style={styles.agreementContainer}>
            <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)}>
              <Text style={styles.agreementText}>
                {isAgreed ? "✔" : "○"} 약관동의
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
            <Image
              source={{
                uri: "http://static.nid.naver.com/oauth/small_g_in.PNG",
              }}
              style={styles.naverLogo}
            />
            <Text style={styles.naverButtonText}>네이버 로그인</Text>
          </TouchableOpacity>
        </>
      )}
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: "80%",
    height: 75,
    marginBottom: 40,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  agreementContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  agreementText: {
    fontSize: 16,
  },
  naverButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1ec800",
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: "center",
  },
  naverButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  naverLogo: {
    width: 20,
    height: 20,
  },
});

export default SignupPage;
