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

export default function SearchPage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [randomizedResults, setRandomizedResults] = useState([]);

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
      setRecentSearches((prev) => [
        searchText,
        ...prev.filter((item) => item !== searchText),
      ]);
      setSearchResults(
        simulatedResults.filter((result) => result.includes(searchText))
      );
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(item)
        ? prevFavorites.filter((fav) => fav !== item)
        : [...prevFavorites, item]
    );
  };

  const renderSearchResult = ({ item }) => (
    <View style={styles.searchResult}>
      <Text style={styles.resultText}>{item}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
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

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Title.png")}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.sortButton} onPress={() => {}}>
        <View style={styles.sortBox} />
      </TouchableOpacity>
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
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Image
              source={require("../../assets/images/clearIcon.png")}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
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
  sortButton: {
    position: "absolute",
    right: 10,
    padding: 10,
    marginTop: 5,
  },
  sortBox: {
    width: 40,
    height: 40,
    backgroundColor: "#000000",
    borderRadius: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
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
