import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TripsContext } from "./TripsContext";
import TabViewComponent from "../../components/ui/TabViewComponent";

export default function SpendingScreen({ route, navigation }) {
  const { tripIndex } = route.params; // 여행 index를 가져옴
  const { trips } = useContext(TripsContext);
  const trip = trips[tripIndex]; // 현재 여행 정보

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TabViewComponent tripIndex={tripIndex} trip={trip} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowIcon: {
    margin: 10,
  },
});
