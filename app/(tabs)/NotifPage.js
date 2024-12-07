import React, { useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TripsContext } from "../../app/(tabs)/TripsContext";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const NotifPage = ({ navigation }) => {
  const staticNotifs = [
    { id: 1, date: "2024-12-06", message: "레포트를 확인하세요." },
    { id: 2, date: "2024-12-06", message: "오늘의 여행이 종료 되었습니다." },
    { id: 3, date: "2024-12-06", message: "여행 일정을 확인하세요." },
  ];

  const { notifications = [], clearNotifications } = useContext(TripsContext); // 기본값으로 빈 배열 설정
  useFocusEffect(
    useCallback(() => {
      // 탭이 활성화될 때 clearNotifications 호출
      clearNotifications();
    }, [clearNotifications])
  );
  const allNotifs = [...staticNotifs, ...notifications];

  const groupedNotifs = allNotifs.reduce((acc, notif) => {
    if (!notif || !notif.date) return acc; // 안전성 체크
    const date = notif.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {});

  console.log("Grouped Notifications:", groupedNotifs); // 디버깅용

  return (
    <View style={styles.container}>
      <Text style={styles.header}>알림</Text>
      <ScrollView style={styles.scrollContainer}>
        {Object.keys(groupedNotifs).map((date, index) => (
          <View key={index} style={styles.dateGroup}>
            <Text style={styles.date}>{date}</Text>
            {groupedNotifs[date].map((notif) => (
              <View key={notif.id} style={styles.notifItem}>
                {/* 왼쪽 아이콘 */}
                <Icon
                  name="alert-circle-outline"
                  size={24}
                  color="#ff9800"
                  style={styles.iconLeft}
                />
                {/* 알림 텍스트 */}
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() => {
                    if (notif.message === "레포트를 확인하세요.") {
                      navigation.navigate("DetailPage");
                    }
                  }}
                >
                  <Text style={styles.notifText}>{notif.message}</Text>
                </TouchableOpacity>
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
  notifItem: {
    flexDirection: "row", // 아이템을 가로로 배치
    alignItems: "center",
    paddingVertical: 20, // 높이 증가
    paddingHorizontal: 20, // 좌우 여백 증가
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 8,
    borderWidth: 1, // 경계선 추가
    borderColor: "gray", // 경계선 검은색
  },
  textContainer: {
    flex: 1, // 텍스트가 중앙에 위치하도록 확장
  },
  notifText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 10, // 아이콘과 텍스트 사이 간격
  },
  iconRight: {
    marginLeft: 10, // 텍스트와 닫기 버튼 사이 간격
  },
});

export default NotifPage;
