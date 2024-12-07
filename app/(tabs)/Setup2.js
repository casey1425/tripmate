import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Setup2 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    Alert.alert("비밀번호가 성공적으로 재설정되었습니다.");
  };

  const handleFindID = () => {
    Alert.alert("등록된 이메일로 아이디가 발송되었습니다.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>아이디 조회 / 비밀번호 재설정</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일 주소를 입력하세요"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleFindID}>
        <Text style={styles.buttonText}>아이디 조회</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="새로운 비밀번호"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
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
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    alignItems: "center",
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: "blue",
  },
});


export default Setup2;
