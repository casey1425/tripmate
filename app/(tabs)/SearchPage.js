import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from "react-native";
import { useFavorites } from "./FavoritesContext";

export default function SearchPage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [randomizedResults, setRandomizedResults] = useState([]);
  const [sortOption, setSortOption] = useState("최신순"); // 기본 정렬 옵션을 최신순으로 설정
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const simulatedResults = [
    { name: "일본1", date: "2022-05-09" },
    { name: "일본2", date: "2023-01-15" },
    { name: "일본3", date: "2024-03-20" },
    { name: "프랑스1", date: "2022-11-30" },
    { name: "프랑스2", date: "2023-06-25" },
    { name: "미국1", date: "2024-12-09" },
    { name: "스페인1", date: "2022-08-14" },
    { name: "스페인2", date: "2023-09-10" },
    { name: "스페인3", date: "2024-02-05" },
    { name: "스페인4", date: "2023-12-01" },
  ];

  useEffect(() => {
    // 초기 로드 시 최신순으로 정렬된 결과를 설정
    const sortedResults = [...simulatedResults].sort((a, b) => new Date(b.date) - new Date(a.date));
    setRandomizedResults(sortedResults);
  }, []);

  const handleSubmitSearch = () => {
    if (searchText.trim() !== "") {
      const results = simulatedResults.filter((result) => result.name.includes(searchText));
      setSearchResults(results);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };

  const sortedResults = (results) => {
    if (sortOption === "이름순") {
      return results.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else if (sortOption === "최신순") {
      return results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "오래된순") {
      return results.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return results;
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.searchResult} onPress={() => {
      setSelectedItem(item);
      setModalVisible(true);
    }}>
      <Text style={styles.resultText}>{item.name}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.name)}
      >
        <Image
          source={
            favorites.includes(item.name)
              ? require("../../assets/images/filledstar.png")
              : require("../../assets/images/star.png")
          }
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleSortOptionSelect1 = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
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
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Image
                source={require("../../assets/images/clearIcon.png")}
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.sortButton}>
          <Image
            source={require("../../assets/images/sortIcon.png")}
            style={styles.sortIcon}
          />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => handleSortOptionSelect1("이름순")} style={styles.dropdownItem}>
              <Text>이름순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOptionSelect1("최신순")} style={styles.dropdownItem}>
              <Text>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOptionSelect1("오래된순")} style={styles.dropdownItem}>
              <Text>오래된순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={sortedResults(searchResults.length > 0 ? searchResults : randomizedResults)} // 검색 결과 또는 초기 결과를 정렬하여 표시
        renderItem={renderSearchResult}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultsList}
      />

      {/* 모달 컴포넌트 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDate}>등록일: {selectedItem.date}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'relative',
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
  dateText: {
    fontSize: 14,
    color: "#808080",
    marginRight: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
