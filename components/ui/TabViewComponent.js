import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Schedule from "./Schedule";
import RemainingBudget from "./RemainingBudget";
import { TripsContext } from "../../app/(tabs)/TripsContext";
const generateDaysFromTravelPeriod = (travelPeriod, totalBudget) => {
  const [start, end] = travelPeriod.split(" ~ ");
  const startDate = new Date(start.trim());
  const endDate = new Date(end.trim());

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error("Invalid travelPeriod:", travelPeriod);
    return [];
  }

  const days = [];
  let currentDate = startDate;

  // 총 예산을 일차별로 분배
  const totalDays =
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const dailyBudgetWon = Math.floor(totalBudget.won / totalDays);
  const dailyBudgetDollar = Math.floor(totalBudget.dollar / totalDays);

  while (currentDate <= endDate) {
    days.push({
      title: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")} (${days.length + 1}일차)`,
      expenses: [],
      schedule: [],
      budget: { won: dailyBudgetWon, dollar: dailyBudgetDollar },
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};
export default function TabViewComponent({ tripIndex, trip }) {
  const [index, setIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editDayKey, setEditDayKey] = useState(null);
  const [newWon, setNewWon] = useState("");
  const [newDollar, setNewDollar] = useState("");
  const [activeTabs, setActiveTabs] = useState({}); // Active tab states
  const { updateTrip } = useContext(TripsContext);
  const totalBudget = {
    won: parseInt(trip.budget || "0", 10),
    dollar: parseFloat(trip.budgetDollar || "0"),
  };

  const tripWithDays = {
    ...trip,
    days: generateDaysFromTravelPeriod(trip.travelPeriod, totalBudget),
  };

  const initialData = tripWithDays.days.reduce((acc, day, idx) => {
    acc[`day${idx + 1}`] = {
      expenses: day.expenses || [],
      schedule: day.schedule || [],
      budget: day.budget || { won: 0, dollar: 0 },
    };
    return acc;
  }, {});

  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (trip.days) {
      const updatedData = trip.days.reduce((acc, day, idx) => {
        acc[`day${idx + 1}`] = {
          expenses: day.expenses || [],
          schedule: day.schedule || [],
          budget: day.budget || { won: 0, dollar: 0 },
        };
        return acc;
      }, {});
      setData(updatedData);
    }
  }, [trip]);
  const getAllBudget = () => {
    const totalWon = Object.values(data).reduce(
      (sum, day) => sum + (day.budget?.won || 0),
      0
    );
    const totalDollar = Object.values(data).reduce(
      (sum, day) => sum + (day.budget?.dollar || 0),
      0
    );
    return { won: totalWon, dollar: totalDollar };
  };

  const getAllData = () => ({
    expenses: Object.values(data).flatMap((day) => day.expenses || []),
    schedule: Object.values(data).flatMap((day) => day.schedule || []),
  });

  const updateScheduleForDay = (dayKey, newSchedule) => {
    setData((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], schedule: newSchedule },
    }));
  };

  const updateBudget = () => {
    if (!editDayKey) return;

    const updatedWon = newWon.trim()
      ? parseInt(newWon, 10)
      : data[editDayKey]?.budget?.won || 0;
    const updatedDollar = newDollar.trim()
      ? parseFloat(newDollar)
      : data[editDayKey]?.budget?.dollar || 0;

    if (isNaN(updatedWon) || isNaN(updatedDollar)) {
      Alert.alert("유효하지 않은 입력", "숫자를 입력하세요.");
      return;
    }

    if (editDayKey === "all") {
      // 전체 예산 수정
      trip.budget = updatedWon.toString();
      trip.budgetDollar = updatedDollar.toString();

      const totalDays = Object.keys(data).length;
      const dailyBudgetWon = Math.floor(updatedWon / totalDays);
      const dailyBudgetDollar = Math.floor(updatedDollar / totalDays);

      const updatedData = Object.keys(data).reduce((acc, key) => {
        acc[key] = {
          ...data[key],
          budget: { won: dailyBudgetWon, dollar: dailyBudgetDollar },
        };
        return acc;
      }, {});

      setData(updatedData);

      const updatedTrip = {
        ...trip,
        budget: updatedWon.toString(),
        budgetDollar: updatedDollar.toString(),
        days: Object.values(updatedData), // 업데이트된 일차 데이터 포함
      };

      console.log("Updated Trip for All Days:", updatedTrip);
      updateTrip(tripIndex, updatedTrip);
    } else {
      // 특정 일차 예산 수정
      const updatedData = {
        ...data,
        [editDayKey]: {
          ...data[editDayKey],
          budget: { won: updatedWon, dollar: updatedDollar },
        },
      };

      // 전체 예산 다시 계산
      const updatedTotalWon = Object.values(updatedData).reduce(
        (sum, day) => sum + (day.budget?.won || 0),
        0
      );
      const updatedTotalDollar = Object.values(updatedData).reduce(
        (sum, day) => sum + (day.budget?.dollar || 0),
        0
      );

      setData(updatedData);

      const updatedTrip = {
        ...trip,
        budget: updatedTotalWon.toString(),
        budgetDollar: updatedTotalDollar.toString(),
        days: Object.values(updatedData), // 업데이트된 일차 데이터 포함
      };

      console.log("Updated Trip in updateBudget:", updatedTrip);
      updateTrip(tripIndex, updatedTrip);
    }

    // 초기화 및 모달 닫기
    setNewWon("");
    setNewDollar("");
    setEditDayKey(null);
    setIsModalVisible(false);
  };

  const handleTabChange = (dayKey, tab) => {
    setActiveTabs((prev) => ({
      ...prev,
      [dayKey]: tab,
    }));
  };

  const renderDayRoute = ({ dayKey, title }) => {
    const activeTab = activeTabs[dayKey] || "expenses";

    return (
      <View
        style={[
          styles.screen,
          activeTab === "expenses" && styles.expensesBackground,
        ]}
      >
        {/* 탭 전환 버튼 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "expenses" && styles.activeTabButton,
            ]}
            onPress={() => handleTabChange(dayKey, "expenses")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "expenses" && styles.activeTabButtonText,
              ]}
            >
              {dayKey === "all" ? "전체 내역" : `${title} 내역`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "schedule" && styles.activeTabButton,
            ]}
            onPress={() => handleTabChange(dayKey, "schedule")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "schedule" && styles.activeTabButtonText,
              ]}
            >
              {dayKey === "all" ? "전체 일정" : `${title} 일정`}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 지출내역 표시*/}
        {activeTab === "expenses" && (
          <Text style={styles.tabInfoText}>
            {dayKey === "all" ? "전체 내역" : `${title} 내역`}
          </Text>
        )}
        {/* 내용 표시 */}
        {activeTab === "expenses" ? (
          <View style={styles.remainingBudgetContainer}>
            <RemainingBudget
              remaining={
                dayKey === "all"
                  ? getAllBudget()
                  : data[dayKey]?.budget || { won: 0, dollar: 0 }
              }
              budget={
                dayKey === "all"
                  ? getAllBudget()
                  : data[dayKey]?.budget || { won: 0, dollar: 0 }
              }
              onSettingsPress={() => {
                setEditDayKey(dayKey);
                setIsModalVisible(true);
              }}
            />
          </View>
        ) : (
          <Schedule
            data={
              dayKey === "all"
                ? getAllData().schedule
                : data[dayKey]?.schedule || []
            }
            onUpdate={(newSchedule) => {
              if (dayKey !== "all") {
                updateScheduleForDay(dayKey, newSchedule);
              }
            }}
            hideInput={dayKey === "all"}
          />
        )}

        {/* 예산 수정 모달 */}
        {isModalVisible && editDayKey === dayKey && (
          <Modal
            visible={isModalVisible}
            transparent={true}
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
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={updateBudget}
                  >
                    <Text style={styles.saveButtonText}>저장</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  const routes = generateDaysFromTravelPeriod(
    trip.travelPeriod,
    totalBudget
  ).map((day, idx) => ({
    key: `day${idx + 1}`,
    title: `${idx + 1}일차`,
  }));

  routes.unshift({ key: "all", title: "전체" });

  const renderScene = ({ route }) => {
    const dayKey =
      route.key === "all"
        ? "all"
        : `day${parseInt(route.key.replace("day", ""), 10)}`;
    const title = route.title;

    return renderDayRoute({ dayKey, title });
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled={routes.length > 5}
          style={{
            backgroundColor: "#FFFFFF",
            elevation: 4,
          }}
          indicatorStyle={{
            backgroundColor: "gray",
            height: 3,
          }}
          labelStyle={{
            fontSize: 14,
            fontWeight: "bold",
          }}
          activeColor="black"
          inactiveColor="gray"
          tabStyle={{
            width:
              routes.length > 5
                ? 90
                : Dimensions.get("window").width / routes.length,
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8EFFF",
    padding: 10,
  },
  expensesBackground: {
    backgroundColor: "#FFFFFF", // 내역 탭의 배경색
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  remainingBudgetContainer: {
    marginTop: "auto", // 화면의 가장 아래로 배치
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "flex-start", // 왼쪽 정렬
    alignItems: "center",
  },
  tabButton: {
    width: 90, // 버튼 크기 조정
    height: 35, // 높이 축소
    marginRight: 10, // 버튼 간 간격
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center", // 텍스트 중앙 정렬
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  activeTabButton: {
    backgroundColor: "#D9D9D9", // 활성화된 버튼 색상
  },
  tabButtonText: {
    fontSize: 12, // 텍스트 크기 축소
    color: "#333",
  },
  activeTabButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  contentText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // 배경을 어둡게
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10, // 모서리를 둥글게
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
