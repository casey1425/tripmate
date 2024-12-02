import React, { useContext, useEffect, useState } from "react";
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
import CountryFlag from "react-native-country-flag";
export default function HomeScreen({ navigation }) {
  const { trips } = useContext(TripsContext);
  const [sortOrder, setSortOrder] = useState("newest"); // 정렬 상태
  const [sortedTrips, setSortedTrips] = useState([...trips]); // 정렬된 여행 데이터

  // 정렬 함수
  const handleSort = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest";
    setSortOrder(newOrder);

    const sorted = [...sortedTrips].sort((a, b) => {
      if (newOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setSortedTrips(sorted);
  };

  // 여행 데이터가 변경될 때 동기화
  React.useEffect(() => {
    setSortedTrips([...trips]);
  }, [trips]);
  const renderTrip = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tripItem}
      onPress={() => navigation.navigate("Spending", { tripIndex: index })}
    >
      <View style={styles.tripRow}>
        <CountryFlag isoCode={item.countryCode || "kr"} style={styles.flag} />
        <View>
          <Text style={styles.tripTitle}>{item.destination}</Text>
          <Text style={styles.tripDates}>{item.travelPeriod}</Text>
          <Text style={styles.tripBudget}>예산: {item.budget}원</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Image
          source={require("../../assets/images/tripmate-logo.png")}
          style={styles.logo}
        />
        <View style={styles.iconsContainer}>
          <Ionicons
            name="add-outline"
            size={40}
            color="black"
            style={styles.icon}
            onPress={() => navigation.navigate("Planning")}
          />
          <TouchableOpacity onPress={handleSort} style={styles.icon}>
            <Image
              source={require("../../assets/images/sortIcon.png")}
              style={styles.sortIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={sortedTrips}
        renderItem={renderTrip}
        keyExtractor={(item, index) => index.toString()}
        extraData={trips}
        contentContainerStyle={styles.tripList}
      />
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
  tripRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  flag: {
    width: 80, // 국기 너비
    height: 60, // 국기 높이
    marginRight: 20, // 텍스트와 국기 간격
    resizeMode: "contain",
  },
  sortIcon: {
    width: 24,
    height: 24,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
    marginTop: 10,
  },
});
