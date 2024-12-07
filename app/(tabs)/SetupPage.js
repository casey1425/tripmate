import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Animated, Alert, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SetupPage = ({ navigation }) => {
  const [isAccountPublic, setIsAccountPublic] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // 초기값 0

  const handleAccountToggle1 = () => {
    const newState = !isAccountPublic;
    setIsAccountPublic(newState);
    setMessage(newState ? "계정이 공개 전환 되었습니다." : "계정이 비공개 전환 되었습니다.");
    showMessage();
  };
  
  const handlePushToggle = () => {
    const newState = !isPushEnabled;
    setIsPushEnabled(newState);
    setMessage(newState ? "앱 알림이 활성화 되었습니다." : "앱 알림이 비활성화 되었습니다.");
    showMessage();
  };

  const showMessage = () => {
    fadeAnim.setValue(0); // 애니메이션 초기화
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // 메시지가 나타난 후 2초 후에 사라지도록 설정
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃 하시겠습니까?",
      [
        {
          text: "확인",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "취소",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>환경설정</Text>

      <View style={styles.profileContainer}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>사용자1</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>내 계정 공개</Text>
          <Switch value={isAccountPublic} onValueChange={handleAccountToggle1} />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>알림(Push)</Text>
          <Switch value={isPushEnabled} onValueChange={handlePushToggle} />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup2")}
        >
          <Text style={styles.settingText}>아이디조회/비밀번호</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup3")}
        >
          <Text style={styles.settingText}>상세 알림 설정</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup4")}
        >
          <Text style={styles.settingText}>공지사항</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>앱버전</Text>
          <Text style={styles.settingText}>1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <Text style={styles.settingText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* 메시지 팝업 */}
      <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
        <Text style={styles.messageText}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 16,
    color: "black",
  },
  messageContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SetupPage;
