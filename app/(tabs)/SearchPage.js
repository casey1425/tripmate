import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function SearchPage({ navigation }) {
  const [recentSearches, setRecentSearches] = useState([]); // 초기 검색어 목록
  const [searchText, setSearchText] = useState(""); // 입력 중인 검색어

  // 최근 검색어 렌더링 (테두리 조정)
  const renderRecentSearch = ({ item }) => (
    <View style={styles.recentTag}>
      <Text style={styles.recentText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteButtonContainer}
        onPress={() =>
          setRecentSearches(recentSearches.filter((search) => search !== item))
        }
      >
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 검색 바 */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="국가, 도시 검색"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {
            if (searchText && !recentSearches.includes(searchText)) {
              setRecentSearches([searchText, ...recentSearches]);
              setSearchText("");
            }
          }}
        />
        <TouchableOpacity onPress={() => setSearchText("")}>
          <Text style={styles.cancelButton}>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 최근 검색어 */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>최근 검색어</Text>
      </View>
      <FlatList
        data={recentSearches}
        renderItem={renderRecentSearch}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.recentList}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
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
  cancelButton: {
    fontSize: 16,
    color: "#007bff",
  },
  recentHeader: {
    marginVertical: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recentList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recentTag: {
    flexDirection: "row",
    alignItems: "center", // 텍스트와 버튼을 중앙 정렬
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 15, // 둥근 테두리
    paddingHorizontal: 8, // 양 옆 여백
    paddingVertical: 4, // 위아래 여백을 줄임
    marginRight: 10, // 태그 간 간격
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    height: 30, // 세로 높이 제한
  },
  recentText: {
    fontSize: 14,
    lineHeight: 20, // 텍스트 높이와 일치
    marginRight: 5, // 삭제 버튼과 간격
  },
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    fontSize: 12,
    color: "#c0c0c0",
  },
});
