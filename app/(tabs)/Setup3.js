import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Setup3 = ({ navigation }) => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);

  const handleEmailToggle = () => setEmailNotification(!emailNotification);
  const handleSmsToggle = () => setSmsNotification(!smsNotification);
  const handlePushToggle = () => setPushNotification(!pushNotification);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>상세 알림 설정</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>이메일 알림</Text>
        <Switch value={emailNotification} onValueChange={handleEmailToggle} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>SMS 알림</Text>
        <Switch value={smsNotification} onValueChange={handleSmsToggle} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>푸시 알림</Text>
        <Switch value={pushNotification} onValueChange={handlePushToggle} />
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Setup3;
