import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotifPage = ({ navigation }) => {
  const [showMore, setShowMore] = useState(false);

  // Sample notifications data
  const notifications = [
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

  const handleShowMore = () => setShowMore(true);

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = notification.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>알림</Text>

      <ScrollView style={styles.scrollContainer}>
        {Object.keys(groupedNotifications).map((date, index) => (
          <View key={index} style={styles.dateGroup}>
            <Text style={styles.date}>{date}</Text>
            {groupedNotifications[date]
              .slice(0, showMore ? undefined : 3)
              .map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <Text style={styles.notificationText}>
                    {notification.message}
                  </Text>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Show More Button */}
      {!showMore && notifications.length > 3 && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={handleShowMore}
        >
          <Text style={styles.showMoreText}>더 보기</Text>
        </TouchableOpacity>
      )}
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
  notificationItem: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
  },
  showMoreButton: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
  },
  showMoreText: {
    color: "white",
    fontSize: 16,
  },
});

export default NotifPage;
