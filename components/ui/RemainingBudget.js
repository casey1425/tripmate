import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RemainingBudget({
  remaining,
  budget,
  onSettingsPress,
}) {
  return (
    <View style={styles.budgetContainer}>
      <View style={styles.budgetHeader}>
        <Text style={styles.budgetTitle}>남은 예산</Text>
        {/* 설정 아이콘 */}
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.budgetAmounts}>
        <Text style={styles.currencyText}>
          ₩ {remaining.won.toLocaleString()}{" "}
          <Text style={styles.goalText}>/ {budget.won.toLocaleString()}</Text>
        </Text>
        <Text style={styles.currencyText}>
          $ {remaining.dollar.toFixed(2)}{" "}
          <Text style={styles.goalText}>/ {budget.dollar.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  budgetContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 10,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginBottom: 7,
  },
  budgetAmounts: {
    alignItems: "center",
  },
  currencyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  goalText: {
    fontSize: 14,
    color: "#777",
  },
});
