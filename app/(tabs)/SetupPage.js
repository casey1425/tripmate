import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SetupPage = ({ navigation }) => {
  const [isAccountPublic, setIsAccountPublic] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  const handleAccountToggle = () =>
    setIsAccountPublic((previousState) => !previousState);
  const handlePushToggle = () =>
    setIsPushEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* 상단 중앙의 환경설정 */}
      <Text style={styles.headerText}>환경설정</Text>

      {/* 프로필 이미지와 이름 */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>이름</Text>
        <Text style={styles.profileDesc}>소개</Text>
      </View>

      {/* 설정 항목 리스트 */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>내 계정 공개</Text>
          <Switch value={isAccountPublic} onValueChange={handleAccountToggle} />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>알림(Push)</Text>
          <Switch value={isPushEnabled} onValueChange={handlePushToggle} />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup2")}
        >
          {" "}
          <Text style={styles.settingText}>아이디조회/암호설정</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup3")}
        >
          {" "}
          <Text style={styles.settingText}>상세 알림 설정</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Setup4")}
        >
          {" "}
          <Text style={styles.settingText}>공지사항</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>앱버전</Text>
          <Text style={styles.settingText}>1.0.0</Text>
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.settingText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileDesc: {
    fontSize: 14,
    color: "#666",
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
});

export default SetupPage;
