import React, { useState, useContext, useEffect } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import RemainingBudget from "./RemainingBudget";
import Schedule from "./Schedule";
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
      schedule: [`Example schedule for day ${days.length + 1}`],
      budget: { won: dailyBudgetWon, dollar: dailyBudgetDollar },
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export default function TabViewComponent({ tripIndex, trip }) {
  const [index, setIndex] = useState(0);
  const [activeTabs, setActiveTabs] = useState({});
  const [data, setData] = useState({});
  const { updateTrip } = useContext(TripsContext);

  const totalBudget = {
    won: parseInt(trip.budget || "0", 10),
    dollar: parseFloat(trip.budgetDollar || "0"),
  };

  const tripWithDays = {
    ...trip,
    days: generateDaysFromTravelPeriod(trip.travelPeriod, totalBudget),
  };

  useEffect(() => {
    const initialData = tripWithDays.days.reduce((acc, day, idx) => {
      acc[`day${idx + 1}`] = {
        expenses: day.expenses || [],
        schedule: day.schedule || [],
        budget: day.budget || { won: 0, dollar: 0 },
      };
      return acc;
    }, {});
    setData(initialData);
  }, [trip]);

  const exampleExpenses = [
    { name: "세븐일레븐 명지대명", category: "편의점", amount: -3200 },
    { name: "캠퍼스라운지", category: "커피/음료", amount: -4500 },
  ];

  const handleScreenPress = (dayKey) => {
    const dayExpenses = data[dayKey]?.expenses || [];
    if (dayExpenses.length >= exampleExpenses.length) {
      Alert.alert("내역이 모두 추가되었습니다.");
      return;
    }

    const nextExpense = exampleExpenses[dayExpenses.length];

    const updatedExpenses = [...dayExpenses, nextExpense];
    setData((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        expenses: updatedExpenses,
        budget: {
          ...prev[dayKey]?.budget,
          won: (prev[dayKey]?.budget?.won || 0) + nextExpense.amount,
        },
      },
    }));
  };

  const renderDayRoute = ({ dayKey, title }) => {
    const activeTab = activeTabs[dayKey] || "expenses";

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.screen, activeTab === "expenses" && styles.expensesBackground]}
        onPress={() => handleScreenPress(dayKey)}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "expenses" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTabs({ [dayKey]: "expenses" })}
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
            onPress={() => setActiveTabs({ [dayKey]: "schedule" })}
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

        {activeTab === "expenses" ? (
          <View style={{ flex: 1 }}>
            <View>
              {data[dayKey]?.expenses?.map((expense, idx) => (
                <View key={idx} style={styles.expenseRow}>
                  <Text style={styles.expenseName}>{expense.name}</Text>
                  <Text style={styles.expenseCategory}>{expense.category}</Text>
                  <Text style={styles.expenseAmount}>{expense.amount}원</Text>
                </View>
              ))}
            </View>
            <View style={styles.remainingBudgetContainer}>
              <RemainingBudget
                remaining={data[dayKey]?.budget || { won: 0, dollar: 0 }}
                budget={data[dayKey]?.budget || { won: 0, dollar: 0 }}
              />
            </View>
          </View>
        ) : (
          <Schedule data={data[dayKey]?.schedule || []} />
        )}
      </TouchableOpacity>
    );
  };

  const routes = generateDaysFromTravelPeriod(trip.travelPeriod, totalBudget).map((day, idx) => ({
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
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabButton: {
    width: 90,
    height: 35,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
  },
  activeTabButton: {
    backgroundColor: "#D9D9D9",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#333",
  },
  activeTabButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
  },
  expenseName: {
    fontSize: 14,
    flex: 3,
  },
  expenseCategory: {
    fontSize: 12,
    color: "#888",
    flex: 2,
    textAlign: "center",
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  remainingBudgetContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
});
