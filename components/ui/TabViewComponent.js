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
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Schedule from "./Schedule";
import RemainingBudget from "./RemainingBudget";
import { TripsContext } from "../../app/(tabs)/TripsContext";

const exampleExpenses = [
  {
    id: "1",
    name: "CONAD city",
    category: "편의점",
    amount: -7200,
    image: require("../../assets/images/convenience-store.png"),
  },
  {
    id: "2",
    name: "산트 유스타치오 더 커피",
    category: "커피/음료",
    amount: -24500,
    image: require("../../assets/images/coffee-cup.png"),
  },
  {
    id: "3",
    name: "La Fenice",
    category: "음식",
    amount: -87500,
    image: require("../../assets/images/dish.png"),
  },
  {
    id: "4",
    name: "Oli d'Oliva i cosmetica natural",
    category: "쇼핑",
    amount: -62000,
    image: require("../../assets/images/online-shopping.png"),
  },
  {
    id: "5",
    name: "라 보라케리아 마켓",
    category: "식료품",
    amount: -15400,
    image: require("../../assets/images/grocery.png"),
  },
  {
    id: "6",
    name: "버스 요금",
    category: "교통",
    amount: -5250,
    image: require("../../assets/images/bus.png"),
  },
  {
    id: "7",
    name: "바티칸 미술관",
    category: "미술관",
    amount: -23250,
    image: require("../../assets/images/museum.png"),
  },
  {
    id: "8",
    name: "CityAus Termini",
    category: "숙박업소",
    amount: -83250,
    image: require("../../assets/images/hotel.png"),
  },
];
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
      expenses: [], // 초기 지출 내역 없음
      schedule: [], // 초기 일정 없음
      budget: { won: dailyBudgetWon, dollar: dailyBudgetDollar }, // 분배된 예산
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
  const [activeTabs, setActiveTabs] = useState({}); // Active tab states
  const { updateTrip, addNotification } = useContext(TripsContext);
  const [remaining, setRemaining] = useState({}); // 남은 예산 상태 추가
  const [totalExpenses, setTotalExpenses] = useState({});
  const [flags, setFlags] = useState(
    () => trip.flags || { alertSent: false, zeroAlertSent: false }
  );
  const totalBudget = {
    won: parseInt(trip.budget || "0", 10),
    dollar: parseFloat(trip.budgetDollar || "0"),
  };
  const safeUpdateTrip = (index, updatedTrip) => {
    updateTrip(index, updatedTrip);
  };
  useEffect(() => {
    const calculateTotalExpenses = () => {
      const updatedTotalExpenses = Object.keys(data).reduce((acc, dayKey) => {
        const dayExpenses = data[dayKey]?.expenses || [];
        const total = dayExpenses.reduce(
          (sum, expense) => sum + (expense.amount || 0),
          0
        );
        acc[dayKey] = total; // 날짜별 지출 총액 저장
        return acc;
      }, {});

      setTotalExpenses(updatedTotalExpenses);
    };

    if (data) calculateTotalExpenses();
  }, [data]);
  // 지출 및 예산 업데이트
  const updateExpensesAndBudget = (dayKey, newExpense) => {
    setData((prevData) => {
      const updatedData = { ...prevData };

      // 지출 내역 업데이트
      const dayExpenses = updatedData[dayKey]?.expenses || [];
      updatedData[dayKey].expenses = [...dayExpenses, newExpense];

      // 최신 budget 값을 기반으로 계산
      const dayBudget = updatedData[dayKey]?.budget || { won: 0, dollar: 0 };
      const spentWon = updatedData[dayKey].expenses.reduce(
        (sum, expense) => sum + Math.abs(expense.amount || 0),
        0
      );
      const remainingWonForDay = dayBudget.won - spentWon;
      updatedData[dayKey].remainingWon = remainingWonForDay;

      // 전체 남아있는 금액 재계산
      const totalRemainingWon = Object.keys(updatedData).reduce(
        (total, key) => total + (updatedData[key].remainingWon || 0),
        0
      );

      console.log(
        `전체 남아있는 금액 계산: totalRemainingWon=${totalRemainingWon}`
      );

      // Context 업데이트
      const updatedTrip = {
        ...trip,
        days: Object.values(updatedData),
      };
      safeUpdateTrip(tripIndex, updatedTrip);

      // 남은 예산 상태 업데이트
      setRemaining((prevRemaining) => ({
        ...prevRemaining,
        totalRemainingWon,
      }));

      return updatedData;
    });
  };

  useEffect(() => {
    if (typeof remaining.totalRemainingWon === "undefined") {
      console.log(
        "Skipping check due to undefined remaining.totalRemainingWon"
      );
      return;
    }

    console.log(
      "Current remaining.totalRemainingWon:",
      remaining.totalRemainingWon
    );
    console.log("Flags before check:", flags);

    const syncedFlags = { ...flags };

    if (
      remaining.totalRemainingWon <= totalBudget.won * 0.2 &&
      !syncedFlags.alertSent
    ) {
      console.log("Triggering 20% below alert.");
      syncedFlags.alertSent = true;
      updateFlags(syncedFlags);
      addNotification({
        id: `total-20percent-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        message: `${trip.destination} 여행에서 예산을 거의 다 사용하였습니다.`,
      });
    }

    if (remaining.totalRemainingWon <= 0 && !syncedFlags.zeroAlertSent) {
      console.log("Triggering 0% below alert.");
      syncedFlags.zeroAlertSent = true;
      updateFlags(syncedFlags);
      addNotification({
        id: `total-0percent-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        message: `${trip.destination} 여행에서 예산을 다 사용하였습니다.`,
      });
    }

    console.log("Flags after check:", syncedFlags);
  }, [remaining.totalRemainingWon, flags, totalBudget.won, trip.destination]);

  const updateFlags = (newFlags) => {
    // 기존 플래그와 새로운 플래그 병합
    const updatedFlags = { ...flags, ...newFlags };

    // 로컬 상태 즉시 업데이트
    setFlags(updatedFlags);

    // Context 동기화
    updateTrip(tripIndex, { ...trip, flags: updatedFlags });

    console.log("Updated Flags:", updatedFlags);
  };

  // 지출 항목 추가
  const addExpenseItem = (dayIndex) => {
    const dayKey = `day${dayIndex + 1}`;
    const startIndex = dayIndex * 2;
    const endIndex = startIndex + 2;
    const availableExpenses = exampleExpenses.slice(startIndex, endIndex);

    const dayExpenses = data[dayKey]?.expenses || [];
    if (dayExpenses.length < availableExpenses.length) {
      const nextExpense = availableExpenses[dayExpenses.length];
      updateExpensesAndBudget(dayKey, nextExpense);
    } else {
      Alert.alert("해당 날짜에 추가할 항목이 없습니다.");
    }
  };

  // 초기화 로직
  useEffect(() => {
    if (!trip.days || trip.days.length === 0) {
      const initialDays = generateDaysFromTravelPeriod(
        trip.travelPeriod,
        totalBudget
      );

      const initialData = initialDays.reduce((acc, day, idx) => {
        acc[`day${idx + 1}`] = {
          expenses: [],
          schedule: [],
          budget: day.budget || { won: 0, dollar: 0 },
          remainingWon: day.budget?.won || 0,
        };
        return acc;
      }, {});

      setData(initialData);
      setRemaining(calculateRemainingBudget(initialData));

      // Context 업데이트
      safeUpdateTrip(tripIndex, { ...trip, days: initialDays });
    } else {
      const updatedData = trip.days.reduce((acc, day, idx) => {
        acc[`day${idx + 1}`] = {
          expenses: day.expenses || [],
          schedule: day.schedule || [],
          budget: day.budget || { won: 0, dollar: 0 },
          remainingWon: day.remainingWon || day.budget?.won || 0,
        };
        return acc;
      }, {});

      setData(updatedData);
      setRemaining(calculateRemainingBudget(updatedData));
    }
  }, [trip]);

  const calculateRemainingBudget = (data) => {
    const remaining = Object.keys(data).reduce((acc, dayKey) => {
      const dayBudget = data[dayKey]?.budget || { won: 0, dollar: 0 };
      const dayExpenses = data[dayKey]?.expenses || [];
      const spentWon = dayExpenses.reduce(
        (sum, expense) => sum + Math.abs(expense.amount || 0),
        0
      );

      acc[dayKey] = {
        won: dayBudget.won - spentWon, // 해당 날짜의 남은 금액
        dollar: dayBudget.dollar, // 해당 날짜의 남은 달러
      };
      return acc;
    }, {});

    // 전체 남아있는 금액 계산
    const totalRemainingWon = Object.keys(remaining).reduce(
      (sum, key) => sum + (remaining[key]?.won || 0),
      0
    );

    remaining.totalRemainingWon = totalRemainingWon; // 전체 남아있는 금액 추가

    return remaining;
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
  const getAllRemaining = () => {
    const totalWon = Object.values(remaining).reduce(
      (sum, budget) => sum + (budget?.won || 0),
      0
    );
    const totalDollar = Object.values(remaining).reduce(
      (sum, budget) => sum + (budget?.dollar || 0),
      0
    );
    return { won: totalWon, dollar: totalDollar };
  };
  const updateScheduleForDay = (dayKey, newSchedule) => {
    // 로컬 데이터 업데이트
    const updatedData = {
      ...data,
      [dayKey]: { ...data[dayKey], schedule: newSchedule },
    };
    setData(updatedData);

    // TripsContext에 저장
    const updatedTrip = {
      ...trip,
      days: Object.keys(updatedData).map((key) => updatedData[key]),
    };
    safeUpdateTrip(tripIndex, updatedTrip);
  };

  const updateBudget = () => {
    if (!editDayKey) return;

    const updatedWon = newWon.trim()
      ? parseInt(newWon, 10)
      : data[editDayKey]?.budget?.won || 0;

    if (isNaN(updatedWon)) {
      Alert.alert("유효하지 않은 입력", "숫자를 입력하세요.");
      return;
    }

    const updatedData = { ...data };

    if (editDayKey === "all") {
      // 전체 예산 수정
      trip.budget = updatedWon.toString();

      const totalDays = Object.keys(data).length;
      const dailyBudgetWon = Math.floor(updatedWon / totalDays);

      Object.keys(updatedData).forEach((key) => {
        updatedData[key].budget.won = dailyBudgetWon;

        // 각 날짜의 remainingWon 초기화
        const spentWon = updatedData[key].expenses.reduce(
          (sum, expense) => sum + Math.abs(expense.amount || 0),
          0
        );
        updatedData[key].remainingWon = dailyBudgetWon - spentWon;
      });
    } else {
      // 특정 일차 예산 수정
      updatedData[editDayKey].budget.won = updatedWon;

      // remainingWon 재계산
      const spentWon = updatedData[editDayKey].expenses.reduce(
        (sum, expense) => sum + Math.abs(expense.amount || 0),
        0
      );
      updatedData[editDayKey].remainingWon = updatedWon - spentWon;
    }

    // 전체 남아있는 금액 재계산
    const totalRemainingWon = Object.keys(updatedData).reduce(
      (total, key) => total + (updatedData[key].remainingWon || 0),
      0
    );

    // 상태 업데이트
    setData(updatedData);
    setRemaining((prevRemaining) => ({
      ...prevRemaining,
      totalRemainingWon,
    }));

    const updatedTrip = {
      ...trip,
      budget: updatedWon.toString(),
      days: Object.values(updatedData),
      flags: { alertSent: false, zeroAlertSent: false }, // 플래그 초기화
    };

    safeUpdateTrip(tripIndex, updatedTrip);
    setFlags({ alertSent: false, zeroAlertSent: false }); // 플래그 로컬 상태 초기화
    setNewWon("");
    setEditDayKey(null);
    setIsModalVisible(false);
  };

  const handleTabChange = (dayKey, tab) => {
    setActiveTabs((prev) => ({
      ...prev,
      [dayKey]: tab,
    }));
  };
  const renderExpensesByDay = (dayKey, travelDays) => {
    const getExpensesForDay = (dayKey) => {
      return data[dayKey]?.expenses || []; // 날짜별 지출 내역 가져오기
    };

    if (dayKey === "all") {
      return travelDays.map((day, index) => {
        const dayKey = `day${index + 1}`;
        const expensesForDay = getExpensesForDay(dayKey);
        const totalExpense = expensesForDay.reduce(
          (sum, expense) => sum + (expense.amount || 0),
          0
        );

        return (
          <View key={index} style={styles.daySection}>
            <View style={styles.headerRow}>
              <Text style={styles.dayHeader}>
                {day.title.replace(/\(\d+일차\)/, "")}
              </Text>
              <Text style={styles.totalExpense}>
                {totalExpense !== 0
                  ? `${totalExpense.toLocaleString()}원`
                  : "지출 없음"}
              </Text>
            </View>

            {/* 지출 내역 표시 */}
            <TouchableOpacity
              onPress={() => addExpenseItem(index)}
              style={styles.expenseTouchableArea}
            >
              {expensesForDay.map((expense, idx) => (
                <View key={idx} style={styles.expenseItem}>
                  <View style={styles.expenseIconContainer}>
                    <Image source={expense.image} style={styles.expenseImage} />
                  </View>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expenseName}>{expense.name}</Text>
                    <Text style={styles.expenseCategory}>
                      {`${expense.category} / 프렌즈 체크카드`}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.expenseAmount,
                      { color: expense.amount > 0 ? "green" : "red" },
                    ]}
                  >
                    {expense.amount.toLocaleString()}원
                  </Text>
                </View>
              ))}
              {expensesForDay.length === 0 && (
                <Text style={styles.noExpensesText}>지출 내역이 없습니다.</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      });
    }

    const expensesForDay = getExpensesForDay(dayKey);
    const totalExpense = expensesForDay.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );

    return (
      <View style={styles.daySection}>
        <View style={styles.headerRow}>
          <Text style={styles.dayHeader}>
            {travelDays[
              parseInt(dayKey.replace("day", ""), 10) - 1
            ]?.title.replace(/\(\d+일차\)/, "") || "날짜 없음"}
          </Text>
          <Text style={styles.totalExpense}>
            {totalExpense !== 0
              ? `${totalExpense.toLocaleString()}원`
              : "지출 없음"}
          </Text>
        </View>

        {/* 지출 내역 표시 */}
        <TouchableOpacity
          onPress={() =>
            addExpenseItem(parseInt(dayKey.replace("day", ""), 10) - 1)
          }
          style={styles.expenseTouchableArea}
        >
          {expensesForDay.map((expense, idx) => (
            <View key={idx} style={styles.expenseItem}>
              <View style={styles.expenseIconContainer}>
                <Image source={expense.image} style={styles.expenseImage} />
              </View>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseName}>{expense.name}</Text>
                <Text style={styles.expenseCategory}>
                  {`${expense.category} / 프렌즈 체크카드`}
                </Text>
              </View>
              <Text
                style={[
                  styles.expenseAmount,
                  { color: expense.amount > 0 ? "green" : "red" },
                ]}
              >
                {expense.amount.toLocaleString()}원
              </Text>
            </View>
          ))}
          {expensesForDay.length === 0 && (
            <Text style={styles.noExpensesText}>지출 내역이 없습니다.</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderDayRoute = ({ dayKey, title }) => {
    const activeTab = activeTabs[dayKey] || "expenses";
    const travelDays = generateDaysFromTravelPeriod(
      trip.travelPeriod,
      totalBudget
    );

    const renderContent = () => {
      if (activeTab === "expenses") {
        return renderExpensesByDay(dayKey, travelDays);
      } else if (activeTab === "schedule") {
        return (
          <View style={{ flex: 1 }}>
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
          </View>
        );
      }
      return null;
    };

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

        {/* 탭 내용 표시 */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {renderContent()}
        </ScrollView>
        {/* 예산 표시 */}
        {activeTab === "expenses" && (
          <View style={styles.remainingBudgetContainer}>
            <RemainingBudget
              remaining={
                dayKey === "all"
                  ? getAllRemaining() // 전체 남은 금액
                  : remaining[dayKey] || { won: 0, dollar: 0 } // 해당 일차의 남은 금액
              }
              budget={
                dayKey === "all"
                  ? getAllBudget() // 전체 예산
                  : data[dayKey]?.budget || { won: 0, dollar: 0 } // 해당 일차의 예산
              }
              countryCurrencyCode={trip.countryCode}
              onSettingsPress={() => {
                setEditDayKey(dayKey);
                setIsModalVisible(true);
              }}
            />
          </View>
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
            backgroundColor: "white",
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
      style={{ flex: 1 }} // Ensure TabView uses full height
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
    backgroundColor: "black",
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
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  expenseIconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseNameRow: {
    flexDirection: "row", // name과 category를 같은 줄에 배치
    alignItems: "center",
  },
  expenseImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  expenseName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5, // name과 category 사이 간격
  },
  expenseCategory: {
    fontSize: 12,
    color: "#777",
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    minWidth: 60,
  },
  noExpensesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  noExpensesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  daySection: {
    marginBottom: 15, // 각 날짜 간 간격
  },
  dayHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // 날짜와 총 지출을 양쪽 끝에 배치
    alignItems: "center",
    marginBottom: 5, // 지출 내역과 간격
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // 날짜 아래 밑줄
    paddingBottom: 5,
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C0C0C0",
    marginBottom: 5,
  },
  totalExpense: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  expenseName: {
    fontSize: 14,
    color: "#333",
    flex: 2,
  },
  expenseCategory: {
    fontSize: 12,
    color: "#777",
    flex: 1,
    textAlign: "center",
  },
  expenseAmount: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0", // 밑줄 색상
    marginBottom: 10, // 지출 항목과 간격 추가
  },
});
