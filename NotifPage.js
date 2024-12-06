import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const NotifPage = ({ navigation }) => {
  const notifs = [
    { id: 1, date: "2024-12-06", message: "레포트를 확인하세요." },
    { id: 2, date: "2024-12-06", message: "오늘의 여행이 종료 되었습니다." },
    { id: 3, date: "2024-12-06", message: "여행 일정을 확인하세요." },
  ];

  const groupedNotifs = notifs.reduce((acc, notif) => {
    const date = notif.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.header}>알림</Text>

      <ScrollView style={styles.scrollContainer}>
        {Object.keys(groupedNotifs).map((date, index) => (
          <View key={index} style={styles.dateGroup}>
            <Text style={styles.date}>{date}</Text>
            {groupedNotifs[date].map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={styles.notifItem}
                onPress={() => {
                  if (notif.message === "레포트를 확인하세요.") {
                    navigation.navigate("DetailPage"); // 새로운 화면으로 이동
                  }
                }}
              >
                <Text style={styles.notifText}>{notif.message}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    maxHeight: 600,
  },
  dateGroup: {
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  notifItem: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 8,
  },
  notifText: {
    fontSize: 14,
    color: "#333",
  },
});

export default NotifPage;
