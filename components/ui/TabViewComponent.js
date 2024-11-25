import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import PrimaryButton from "./PrimaryButton";
import Schedule from "./Schedule";
import RemainingBudget from "./RemainingBudget";

export default function TabViewComponent() {
  const [index, setIndex] = useState(0);

  const [activeButtons, setActiveButtons] = useState({
    day1: "day1 버튼 1",
    day2: "day2 버튼 1",
    day3: "day3 버튼 1",
    day4: "day4 버튼 1",
  });

  const [data, setData] = useState({
    day1: { expenses: [], schedule: [] },
    day2: { expenses: [], schedule: [] },
    day3: { expenses: [], schedule: [] },
    day4: { expenses: [], schedule: [] },
  });
  const allData = {
    expenses: ["항목 1 - ₩100,000", "항목 2 - ₩200,000", "항목 3 - ₩50,000"],
    schedule: [
      { id: 1, text: "일정 1" },
      { id: 2, text: "일정 2" },
      { id: 3, text: "일정 3" },
    ],
  };

  const [budget, setBudget] = useState({ won: 1000000, dollar: 721.9 });
  const [remaining, setRemaining] = useState({ won: 992301, dollar: 716.34 });
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newWon, setNewWon] = useState("");
  const [newDollar, setNewDollar] = useState("");
  const [modalStates, setModalStates] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
  }); // 각 탭의 모달 상태 관리

  const [budgets, setBudgets] = useState({
    day1: { won: 1000000, dollar: 721.9 },
    day2: { won: 900000, dollar: 700.0 },
    day3: { won: 800000, dollar: 650.5 },
    day4: { won: 850000, dollar: 680.2 },
  }); // 각 탭의 예산 관리

  const [remainingBudgets, setRemainingBudgets] = useState({
    day1: { won: 992301, dollar: 716.34 },
    day2: { won: 890000, dollar: 698.0 },
    day3: { won: 780000, dollar: 645.5 },
    day4: { won: 840000, dollar: 678.2 },
  }); // 각 탭의 남은 예산 관리

  const updateDayBudget = (dayKey) => {
    let updatedWon = budgets[dayKey].won; // 기본값: 기존 값 유지
    let updatedDollar = budgets[dayKey].dollar;

    // ₩ 입력값 검증
    if (newWon.trim() !== "") {
      if (isNaN(Number(newWon))) {
        Alert.alert("유효하지 않은 입력", "₩ 입력 칸에 숫자를 입력해주세요.");
        return;
      }
      updatedWon = Number(newWon); // 입력값이 유효하면 업데이트
    }

    // $ 입력값 검증
    if (newDollar.trim() !== "") {
      if (isNaN(Number(newDollar))) {
        Alert.alert("유효하지 않은 입력", "$ 입력 칸에 숫자를 입력해주세요.");
        return;
      }
      updatedDollar = Number(newDollar); // 입력값이 유효하면 업데이트
    }

    // 상태 업데이트
    setBudgets((prev) => ({
      ...prev,
      [dayKey]: { won: updatedWon, dollar: updatedDollar },
    }));

    setRemainingBudgets((prev) => ({
      ...prev,
      [dayKey]: { won: updatedWon, dollar: updatedDollar },
    }));

    // 입력 필드 초기화 및 모달 닫기
    setNewWon("");
    setNewDollar("");
    closeModal();
  };

  const getAllData = () => ({
    expenses: [
      ...data.day1.expenses,
      ...data.day2.expenses,
      ...data.day3.expenses,
      ...data.day4.expenses,
    ],
    schedule: [
      ...data.day1.schedule,
      ...data.day2.schedule,
      ...data.day3.schedule,
      ...data.day4.schedule,
    ],
  });

  const renderDayRoute = ({ dayKey, title }) => {
    const activeButton = activeButtons[dayKey];

    const openModal = () => {
      setModalStates((prev) => ({ ...prev, [dayKey]: true }));
    };

    // closeModal 함수 정의
    const closeModal = () => {
      setModalStates((prev) => ({ ...prev, [dayKey]: false }));
      setNewWon(""); // 입력 필드 초기화
      setNewDollar(""); // 입력 필드 초기화
    };

    const updateDayBudget = () => {
      let updatedWon = budgets[dayKey].won; // 기본값: 기존 값 유지
      let updatedDollar = budgets[dayKey].dollar;

      // ₩ 입력값 검증
      if (newWon.trim() !== "") {
        if (isNaN(Number(newWon))) {
          Alert.alert("유효하지 않은 입력", "₩ 입력 칸에 숫자를 입력해주세요.");
          return;
        }
        updatedWon = Number(newWon); // 입력값이 유효하면 업데이트
      }

      // $ 입력값 검증
      if (newDollar.trim() !== "") {
        if (isNaN(Number(newDollar))) {
          Alert.alert("유효하지 않은 입력", "$ 입력 칸에 숫자를 입력해주세요.");
          return;
        }
        updatedDollar = Number(newDollar); // 입력값이 유효하면 업데이트
      }

      // 상태 업데이트
      setBudgets((prev) => ({
        ...prev,
        [dayKey]: { won: updatedWon, dollar: updatedDollar },
      }));

      setRemainingBudgets((prev) => ({
        ...prev,
        [dayKey]: { won: updatedWon, dollar: updatedDollar },
      }));

      // 모달 닫기
      closeModal();
    };

    return (
      <View
        style={[
          styles.screen,
          {
            backgroundColor:
              activeButton === `${dayKey} 버튼 1` ? "#FFFFFF" : "#F8EFFF",
          },
        ]}
      >
        <View style={styles.ButtonContainer}>
          <PrimaryButton
            title={`${title} 내역`}
            onPress={() =>
              setActiveButtons((prev) => ({
                ...prev,
                [dayKey]: `${dayKey} 버튼 1`,
              }))
            }
            isActive={activeButton === `${dayKey} 버튼 1`}
          />
          <PrimaryButton
            title={`${title} 일정`}
            onPress={() =>
              setActiveButtons((prev) => ({
                ...prev,
                [dayKey]: `${dayKey} 버튼 2`,
              }))
            }
            isActive={activeButton === `${dayKey} 버튼 2`}
          />
        </View>

        {activeButton === `${dayKey} 버튼 1` ? (
          <View style={styles.contentWrapper}>
            <Text style={styles.header}>{`${title} 내역`}</Text>
            <FlatList
              data={data[dayKey].expenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
            <RemainingBudget
              remaining={remainingBudgets[dayKey]}
              budget={budgets[dayKey]}
              onSettingsPress={openModal}
            />
          </View>
        ) : (
          <Schedule
            data={data[dayKey].schedule}
            onUpdate={(newSchedule) =>
              setData((prev) => ({
                ...prev,
                [dayKey]: {
                  ...prev[dayKey],
                  schedule: newSchedule,
                },
              }))
            }
          />
        )}

        {/* 모달 */}
        <Modal
          transparent={true}
          visible={modalStates[dayKey]}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>예산 수정</Text>
              <TextInput
                style={styles.input}
                placeholder="₩ 새 예산 입력"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={newWon}
                onChangeText={setNewWon}
              />
              <TextInput
                style={styles.input}
                placeholder="$ 새 예산 입력"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={newDollar}
                onChangeText={setNewDollar}
              />
              <View style={styles.modalButtons}>
                <PrimaryButton title="저장" onPress={updateDayBudget} />
                <PrimaryButton title="취소" onPress={closeModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const 전체RouteComponent = ({
    allData,
    budget,
    remaining,
    setBudget,
    setRemaining,
    isModalVisible,
    setIsModalVisible,
  }) => {
    const [activeButton, setActiveButton] = useState("전체 지출 내역");
    const [newWon, setNewWon] = useState("");
    const [newDollar, setNewDollar] = useState("");

    const updateBudget = () => {
      // 입력값 검증
      if (newWon && isNaN(parseFloat(newWon))) {
        Alert.alert("유효하지 않은 입력", "₩ 입력 칸에 숫자를 입력해주세요.");
        return;
      }

      if (newDollar && isNaN(parseFloat(newDollar))) {
        Alert.alert("유효하지 않은 입력", "$ 입력 칸에 숫자를 입력해주세요.");
        return;
      }

      const updatedWon = newWon ? parseFloat(newWon) : budget.won;
      const updatedDollar = newDollar ? parseFloat(newDollar) : budget.dollar;

      setBudget({ won: updatedWon, dollar: updatedDollar });
      setRemaining({ won: updatedWon, dollar: updatedDollar });

      setIsModalVisible(false);
      setNewWon("");
      setNewDollar("");
    };

    return (
      <View
        style={[
          styles.screen,
          {
            backgroundColor:
              activeButton === "전체 지출 내역" ? "#FFFFFF" : "#F8EFFF",
          },
        ]}
      >
        {/* 버튼 컨테이너 */}
        <View style={styles.ButtonContainer}>
          <PrimaryButton
            title="전체 지출 내역"
            onPress={() => setActiveButton("전체 지출 내역")}
            isActive={activeButton === "전체 지출 내역"}
          />
          <PrimaryButton
            title="전체 일정"
            onPress={() => setActiveButton("전체 일정")}
            isActive={activeButton === "전체 일정"}
          />
        </View>

        {/* 내용 렌더링 */}
        <View style={styles.contentWrapper}>
          {activeButton === "전체 일정" ? (
            <FlatList
              data={allData.schedule}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                  <Text style={styles.listItemText}>{item.text}</Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          ) : (
            <View>
              <Text style={styles.header}>전체 지출 내역</Text>
              <FlatList
                data={allData.expenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.listItemContainer}>
                    <Text style={styles.listItemText}>{item}</Text>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </View>
          )}
        </View>

        {/* 남은 예산 섹션 */}
        {activeButton === "전체 지출 내역" && (
          <RemainingBudget
            remaining={remaining}
            budget={budget}
            onSettingsPress={() => setIsModalVisible(true)}
          />
        )}

        {/* 모달 */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>예산 수정</Text>
              <TextInput
                style={styles.input}
                placeholder="₩ 새 예산 입력"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={newWon}
                onChangeText={setNewWon}
              />
              <TextInput
                style={styles.input}
                placeholder="$ 새 예산 입력"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={newDollar}
                onChangeText={setNewDollar}
              />
              <View style={styles.modalButtons}>
                <PrimaryButton title="저장" onPress={updateBudget} />
                <PrimaryButton
                  title="취소"
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const routes = [
    { key: "전체", title: "전체" },
    { key: "1일차", title: "1일차" },
    { key: "2일차", title: "2일차" },
    { key: "3일차", title: "3일차" },
    { key: "4일차", title: "4일차" },
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "전체":
        return (
          <전체RouteComponent
            allData={getAllData()} // getAllData로 동적 데이터 전달
            budget={budget}
            remaining={remaining}
            setBudget={setBudget}
            setRemaining={setRemaining}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        );
      case "1일차":
        return renderDayRoute({ dayKey: "day1", title: "1일차" });
      case "2일차":
        return renderDayRoute({ dayKey: "day2", title: "2일차" });
      case "3일차":
        return renderDayRoute({ dayKey: "day3", title: "3일차" });
      case "4일차":
        return renderDayRoute({ dayKey: "day4", title: "4일차" });
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "gray", height: 2 }}
          style={{ backgroundColor: "#fff" }}
          labelStyle={{ color: "black", fontSize: 12 }}
          tabStyle={{ flexDirection: "row" }}
          activeColor="black"
          inactiveColor="gray"
        />
      )}
      initialLayout={{ width: Dimensions.get("window").width }}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  listItemContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0", // 얇은 테두리
    shadowColor: "#000", // 그림자
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android 그림자
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
