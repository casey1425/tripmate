import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFavorites } from "./FavoritesContext";

export default function FavsPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [sortOption, setSortOption] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleSortOptionSelect2 = (option) => {
    setSortOption(option);
    setDropdownVisible(false);

    // let sortedFavorites = [...favoriteItem];

    if (sortOption === "이름순") {
      // sortedFavorites = sortedFavorites.sort((a, b) => a.localeCompare(b, "ko"));
    } else if (sortOption === "최신순") {
      // 최신순 정렬 로직 추가 (예시: 날짜순으로 정렬)
      // 예시로는 각 즐겨찾기가 날짜 속성을 가지고 있다고 가정
      // sortedFavorites = sortedFavorites.sort((a, b) => b.date - a.date); // 가정: 'date' 속성이 숫자 타입
    } else if (sortOption === "오래된순") {
      // 오래된순 정렬 로직 추가 (예시: 날짜순으로 반대로 정렬)
      // sortedFavorites = sortedFavorites.sort((a, b) => a.date - b.date);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.name)}>
        <Image
          source={require("../../assets/images/filledstar.png")}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>즐겨찾기</Text>
        <TouchableOpacity
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={styles.sortButton}
        >
          <Image
            source={require("../../assets/images/sortIcon.png")}
            style={styles.sortIcon}
          />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => handleSortOptionSelect2("이름순")}
              style={styles.dropdownItem}
            >
              <Text>이름순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortOptionSelect2("최신순")}
              style={styles.dropdownItem}
            >
              <Text>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortOptionSelect2("오래된순")}
              style={styles.dropdownItem}
            >
              <Text>오래된순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={favorites} // 사용자가 선택한 정렬 옵션에 따른 즐겨찾기 목록
        renderItem={renderFavoriteItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginLeft: 38,
  },
  sortButton: {
    padding: 10,
  },
  sortIcon: {
    width: 20,
    height: 20,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
});
