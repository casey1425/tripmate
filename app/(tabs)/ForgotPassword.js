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

const ForgotPassword = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // 비밀번호 재설정 처리 로직 (백엔드 연동 필요)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/Title.png")}
        style={styles.logo}
        resizeMode="contain" // 이미지가 잘리지 않도록 설정
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일 주소 입력"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>비밀번호 재설정</Text>
      </TouchableOpacity>
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
});

export default ForgotPassword;
