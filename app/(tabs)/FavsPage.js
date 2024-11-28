import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

export default function FavsPage() {
  const [favorites, setFavorites] = useState([
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
  ]);

  const removeFavorite = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== item));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Image
          source={require("../../assets/images/filledstar.png")}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.headerText}>즐겨찾기</Text>

      <FlatList
        data={favorites}
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
