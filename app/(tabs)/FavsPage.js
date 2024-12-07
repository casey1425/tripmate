import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { useFavorites } from "./FavoritesContext";

export default function FavsPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [sortOption, setSortOption] = useState("최신순");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSortOptionSelect2 = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
  };

  const sortedFavorites = () => {
    if (!sortOption) return favorites; // 정렬 옵션이 없으면 원래 favorites 반환

    const sortedArray = [...favorites]; // 원본 배열을 복사

    if (sortOption === "이름순") {
      sortedArray.sort((a, b) => (a.name || a).localeCompare(b.name || b, "ko")); // 이름순 정렬
    } else if (sortOption === "최신순") {
      sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬
    } else if (sortOption === "오래된순") {
      sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date)); // 오래된순 정렬
    }

    return sortedArray;
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.searchResult} onPress={() => {
      setSelectedItem(item);
      setModalVisible(true);
    }}>
    <View style={styles.favoriteItem}>
      <Text style={styles.itemText}>{typeof item === 'string' ? item : item.name}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(typeof item === 'string' ? item : item.name)}>
        <Image
          source={require("../../assets/images/filledstar.png")}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>즐겨찾기</Text>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.sortButton}>
          <Image
            source={require("../../assets/images/sortIcon.png")}
            style={styles.sortIcon}
          />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => handleSortOptionSelect2("이름순")} style={styles.dropdownItem}>
              <Text>이름순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOptionSelect2("최신순")} style={styles.dropdownItem}>
              <Text>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOptionSelect2("오래된순")} style={styles.dropdownItem}>
              <Text>오래된순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={sortedFavorites()} // 정렬된 즐겨찾기 목록
        renderItem={renderFavoriteItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
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
