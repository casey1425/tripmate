import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CurrencyMapping from "./CurrenyMapping"; // 매핑 파일 import

export default function RemainingBudget({
  remaining,
  budget,
  onSettingsPress,
  countryCurrencyCode,
}) {
  const [exchangeRate, setExchangeRate] = useState(null); // 환율 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태 초기화
  const [convertedRemaining, setConvertedRemaining] = useState(null); // 변환된 예산

  // 국가 코드로 환율 코드 확인
  const currencyCode =
    CurrencyMapping[countryCurrencyCode.toLowerCase()] || "USD";

  // 환율 데이터 가져오기
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/942d6fabefccf43330969a3b/latest/KRW`
        );
        const data = await response.json();
        console.log("환율 데이터:", data);

        if (data.conversion_rates) {
          const rate = data.conversion_rates[currencyCode];
          if (rate) {
            setExchangeRate(rate);
            console.log(`환율 (${currencyCode}):`, rate);
          } else {
            console.warn(
              `환율 정보를 찾을 수 없습니다. 통화 코드: ${currencyCode}`
            );
            setExchangeRate(1.0); // 기본값
          }
        } else {
          console.error("환율 데이터를 가져올 수 없습니다.");
          setExchangeRate(1.0); // 기본값
        }
      } catch (error) {
        console.error("환율 데이터를 가져오는 중 오류 발생:", error);
        setExchangeRate(1.0); // 기본값
      } finally {
        setLoading(false);
      }
    };

    if (currencyCode) fetchExchangeRate();
  }, [currencyCode]);

  // 남은 예산 변환
  useEffect(() => {
    if (exchangeRate && remaining.won) {
      setConvertedRemaining((remaining.won * exchangeRate).toFixed(2));
    } else {
      setConvertedRemaining("N/A");
    }
  }, [exchangeRate, remaining]);

  return (
    <View style={styles.budgetContainer}>
      <View style={styles.budgetHeader}>
        <Text style={styles.budgetTitle}>남은 예산</Text>
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : exchangeRate ? (
        <View style={styles.budgetAmounts}>
          <Text style={styles.currencyText}>
            ₩ {remaining.won.toLocaleString()}{" "}
            <Text style={styles.goalText}>/ {budget.won.toLocaleString()}</Text>
          </Text>
          <Text style={styles.currencyExchangeText}>
            {currencyCode}: {convertedRemaining || "N/A"}{" "}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>환율 데이터를 가져올 수 없습니다.</Text>
      )}
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
  currencyExchangeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(4, 177, 157)",
  },
  goalText: {
    fontSize: 14,
    color: "#777",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});
