import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { PieChart } from "react-native-chart-kit";

const DetailPage = () => {
  // 그래프 데이터
  const pieData = [
    {
      name: "항공/숙박",
      population: 0,
      color: "#A8DADC", // 민트
      amount: "0원",
    },
    {
      name: "음식점/카페",
      population: 64,
      color: "#F4A261", // 피치 오렌지
      amount: "35,000원",
    },
    {
      name: "쇼핑",
      population: 29,
      color: "#FFADAD", // 파스텔 핑크
      amount: "15,500원",
    },
    {
      name: "교통",
      population: 5,
      color: "#BDB2FF", // 라벤더
      amount: "2,800원",
    },
    {
      name: "기타",
      population: 2,
      color: "#FFE6A7", // 파스텔 옐로우
      amount: "1,000원",
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  // 총 지출 계산
  const totalAmount = pieData.reduce((acc, item) => {
    const numAmount = parseInt(item.amount.replace(/[^0-9]/g, ""), 10); // 숫자만 추출
    return acc + numAmount;
  }, 0);

  return (
    <View style={styles.container}>
      {/* 상단 레포트 제목 */}
      <Text style={styles.title}>레포트</Text>

      {/* 카테고리별 지출 텍스트 */}
      <Text style={styles.subtitle}>카테고리별 지출</Text>

      {/* 원형 그래프 중앙 배치 */}
      <View style={styles.graphContainer}>
        <PieChart
          data={pieData}
          width={screenWidth - 40} // 그래프의 너비
          height={220} // 그래프의 높이
          chartConfig={{
            backgroundColor: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={screenWidth * 0.2} // 그래프를 중앙으로 조정
          hasLegend={false} // 그래프 옆의 텍스트 제거
        />
      </View>

      {/* 그래프 아래 설명 리스트 */}
      <FlatList
        data={pieData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.itemText}>
              {item.name} {item.population}%
            </Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        )}
      />

      {/* 총 지출 섹션 */}
      <View style={styles.separator} /> {/* 회색 선 */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>총 지출</Text>
        <Text style={styles.totalAmount}>{totalAmount.toLocaleString()}원</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  graphContainer: {
    alignItems: "center", // 그래프를 수평 중앙 정렬
    justifyContent: "center", // 그래프를 수직 중앙 정렬
    marginBottom: 20, // 그래프 아래 여백
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0", // 회색 선
    marginVertical: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#7f7f7f", // 연한 회색 텍스트
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // 검은색 텍스트
  },
});

export default DetailPage;
