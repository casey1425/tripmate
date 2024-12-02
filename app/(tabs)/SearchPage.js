import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useFavorites } from "./FavoritesContext";

export default function SearchPage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]); // add setSearchResults here
  const { favorites, toggleFavorite } = useFavorites();
  const [randomizedResults, setRandomizedResults] = useState([]);
  const [sortOption, setSortOption] = useState("이름순");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const simulatedResults = [
    "일본1",
    "일본2",
    "일본3",
    "프랑스1",
    "프랑스2",
    "미국1",
    "스페인1",
    "스페인2",
    "스페인3",
    "스페인4",
  ];

  useEffect(() => {
    setRandomizedResults(simulatedResults.sort(() => Math.random() - 0.5));
  }, []);

  const handleSubmitSearch = () => {
    if (searchText.trim() !== "") {
      setSearchResults(
        simulatedResults.filter((result) => result.includes(searchText))
      );
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchResults([]); // Reset search results on clear
  };

  const renderSearchResult = ({ item }) => (
    <View style={styles.searchResult}>
      <Text style={styles.resultText}>{item}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)} // Use toggleFavorite from context
      >
        <Image
          source={
            favorites.includes(item)
              ? require("../../assets/images/filledstar.png")
              : require("../../assets/images/star.png")
          }
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const handleSortOptionSelect1 = (option) => {
    setSortOption(option);
    setDropdownVisible(false);

    let sortedResults = [...searchResults];

    if (option === "이름순") {
      sortedResults = sortedResults.sort((a, b) => a.localeCompare(b, "ko"));
    } else if (option === "최신순") {
      // 최신순 정렬 로직 추가 (예시)
    } else if (option === "오래된순") {
      // 오래된순 정렬 로직 추가 (예시)
    }

    setSearchResults(sortedResults); // Update the search results with the sorted list
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Title.png")}
        style={styles.logo}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image
            source={require("../../assets/images/searchIcon.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSubmitSearch}
          />
          {searchText !== "" && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <Image
                source={require("../../assets/images/clearIcon.png")}
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>
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
              onPress={() => handleSortOptionSelect1("이름순")}
              style={styles.dropdownItem}
            >
              <Text>이름순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortOptionSelect1("최신순")}
              style={styles.dropdownItem}
            >
              <Text>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortOptionSelect1("오래된순")}
              style={styles.dropdownItem}
            >
              <Text>오래된순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <FlatList
          data={randomizedResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.resultsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 10,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  sortButton: {
    padding: 10,
    position: "relative",
  },
  sortIcon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    position: "absolute",
    top: 50, // Adjust based on your layout
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
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#808080",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 20,
    height: 20,
    tintColor: "#808080",
  },
  searchResult: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultText: {
    fontSize: 16,
    flex: 1,
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
  resultsList: {
    marginTop: 10,
  },
});
