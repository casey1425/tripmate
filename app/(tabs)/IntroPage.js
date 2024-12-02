import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

const IntroPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/MainLogo.png")}
        style={[styles.logo, { width: 500, height: 500 * 0.75 }]}
      />
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AECCC4",
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 40,
  },
  loader: {
    position: "absolute",
    bottom: 50,
  },
});

export default IntroPage;
