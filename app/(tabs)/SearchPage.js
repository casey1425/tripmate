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
  const [searchText, setSearchText] = useState(""); // 현재 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 상태
  const [randomizedResults, setRandomizedResults] = useState([]); // 랜덤 데이터

  // 임시 검색 결과 데이터
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

  // 컴포넌트 로드 시 데이터 랜덤화
  useEffect(() => {
    setRandomizedResults(simulatedResults.sort(() => Math.random() - 0.5));
  }, []);

  // 엔터키 입력 후 검색어 처리
  const handleSubmitSearch = () => {
    setSearchResults(
      simulatedResults.filter((result) => result.includes(searchText))
    );
    setSearchText(""); // 검색어 입력란 비우기
  };

  // 즐겨찾기 추가 또는 삭제
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(item)) {
        return prevFavorites.filter((fav) => fav !== item);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  // 검색 결과 렌더링
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
              ? require("../../assets/images/filledstar.png") // 즐겨찾기된 상태
              : require("../../assets/images/star.png") // 즐겨찾기되지 않은 상태
          }
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상단 제목 이미지 */}
      <Image
        source={require("../../assets/images/Title.png")}
        style={styles.logo}
      />

      {/* 우상단 정렬 버튼 */}
      <TouchableOpacity style={styles.sortButton} onPress={() => {}}>
        <View style={styles.sortBox} />
      </TouchableOpacity>

      {/* 검색 바 */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="국가, 도시 검색"
          value={searchText}
          onChangeText={setSearchText} // 입력 상태를 업데이트만 함
          onSubmitEditing={handleSubmitSearch} // 엔터키로 검색 제출
        />
      </View>

      {/* 검색 결과 */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        // 랜덤 데이터 표시
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginRight: 10,
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
