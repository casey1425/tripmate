import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotifPage = ({ navigation }) => {
  const notifs = [
    { id: 1, date: "2024-11-20", message: "오늘의 여행이 종료되었습니다." },
    { id: 2, date: "2024-11-20", message: "여행 피드백을 작성해주세요." },
    { id: 3, date: "2024-11-20", message: "여행 일정을 확인하세요." },
    {
      id: 4,
      date: "2024-11-19",
      message: "이번 여행의 결과 레포트가 도착했습니다.",
    },
    { id: 5, date: "2024-11-19", message: "다음 여행을 계획해보세요." },
    {
      id: 6,
      date: "2024-11-19",
      message: "여행 중 사진 업로드를 잊지 마세요.",
    },
    { id: 7, date: "2024-11-18", message: "여행 일정이 변경되었습니다." },
    {
      id: 8,
      date: "2024-11-18",
      message: "다음 목적지에 대한 정보가 업데이트되었습니다.",
    },
    { id: 9, date: "2024-11-18", message: "숙소 예약이 완료되었습니다." },
    {
      id: 10,
      date: "2024-11-17",
      message: "여행지에서 새로운 업데이트가 있습니다.",
    },
    {
      id: 11,
      date: "2024-11-17",
      message: "날씨 변화에 따른 준비물 안내입니다.",
    },
    {
      id: 12,
      date: "2024-11-17",
      message: "새로운 여행지 정보가 추가되었습니다.",
    },
    {
      id: 13,
      date: "2024-11-16",
      message: "새로운 여행지 추천이 도착했습니다.",
    },
    {
      id: 14,
      date: "2024-11-16",
      message: "여행지에서 즐길 수 있는 활동을 확인하세요.",
    },
    { id: 15, date: "2024-11-16", message: "여행 관련 팁을 확인해보세요." },
    { id: 16, date: "2024-11-15", message: "오늘의 여행이 종료되었습니다." },
    { id: 17, date: "2024-11-15", message: "여행 준비가 완료되었습니다." },
    { id: 18, date: "2024-11-15", message: "여행지 변경에 대한 알림입니다." },
    { id: 19, date: "2024-11-14", message: "여행 준비가 완료되었습니다." },
    {
      id: 20,
      date: "2024-11-14",
      message: "여행 예약이 성공적으로 이루어졌습니다.",
    },
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

      <Text style={styles.headerText}>알림</Text>

      <ScrollView style={styles.scrollContainer}>
        {Object.keys(groupedNotifs).map((date, index) => (
          <View key={index} style={styles.dateGroup}>
            <Text style={styles.date}>{date}</Text>
            {groupedNotifs[date].map((notif) => (
              <View key={notif.id} style={styles.notifItem}>
                <Text style={styles.notifText}>{notif.message}</Text>
              </View>
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
