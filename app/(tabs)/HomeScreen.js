import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TripsContext } from "./TripsContext";

export default function HomeScreen({ navigation }) {
  const { trips } = useContext(TripsContext);

  const renderTrip = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tripItem}
      onPress={() => navigation.navigate("Spending", { tripIndex: index })}
    >
      <Text style={styles.tripTitle}>{item.destination}</Text>
      <Text style={styles.tripDates}>{item.travelPeriod}</Text>
      <Text style={styles.tripBudget}>예산: {item.budget}원</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Image
          source={require("../../assets/images/tripmate-logo.png")}
          style={styles.logo}
        />
        <Ionicons
          name="add-outline"
          size={40}
          color="black"
          style={styles.icon}
          onPress={() => navigation.navigate("Planning")}
        />
      </View>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tripList}
      />
      <View style={styles.shortcutsContainer}>
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.shortcutText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.shortcutText}>검색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.shortcutText}>즐겨찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate("Notif")}
        >
          <Text style={styles.shortcutText}>알림</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate("Setup")}
        >
          <Text style={styles.shortcutText}>환경설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  TopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 25,
    marginTop: 15,
  },
  tripList: {
    padding: 13,
    marginLeft: 10,
  },
  tripItem: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tripDates: {
    fontSize: 14,
    color: "#666",
  },
  tripBudget: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  shortcutsContainer: {
    position: "absolute",
    bottom: 20, // 화면 최하단으로 위치
    flexDirection: "row",
    flexWrap: "wrap", // 버튼이 줄을 넘어가면 다음 줄로
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  shortcut: {
    width: 80, // 사각형 버튼 너비
    height: 40, // 사각형 버튼 높이
    backgroundColor: "#ccc", // 버튼 배경색
    borderWidth: 2, // 테두리 두께
    borderColor: "black", // 테두리 색
    justifyContent: "center",
    alignItems: "center",
    margin: 5, // 버튼 사이 여백
  },
  shortcutText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
