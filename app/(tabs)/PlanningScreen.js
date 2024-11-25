import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { TripsContext } from "./TripsContext";

export default function PlanningScreen({ navigation }) {
  const { addTrip } = useContext(TripsContext);

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (!endDate && day.dateString > startDate) {
      setEndDate(day.dateString);
      setIsCalendarVisible(false);
    } else {
      setStartDate(day.dateString);
      setEndDate(null);
    }
  };

  const handleSave = () => {
    if (!destination || !startDate || !endDate || !budget) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    const newTrip = {
      destination,
      travelPeriod: `${startDate} ~ ${endDate}`,
      budget,
      memo,
    };

    addTrip(newTrip);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>여행지</Text>
        <TextInput
          style={styles.input}
          placeholder="여행지를 입력하세요"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
        />
        <Text style={styles.label}>여행기간</Text>
        <TouchableOpacity
          style={[styles.input, styles.inputWithIcon]}
          onPress={() => setIsCalendarVisible(true)}
        >
          <Text style={styles.inputText}>
            {startDate && endDate ? `${startDate} ~ ${endDate}` : "여행 기간"}
          </Text>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.label}>여행예산</Text>
        <TextInput
          style={styles.input}
          placeholder="예산을 입력하세요"
          placeholderTextColor="gray"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
        <Text style={styles.label}>메모</Text>
        <TextInput
          style={[styles.input, styles.memoInput]}
          placeholder="메모를 입력하세요"
          placeholderTextColor="gray"
          value={memo}
          onChangeText={setMemo}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>계획 만들기</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [startDate]: {
                selected: true,
                startingDay: true,
                color: "green",
              },
              [endDate]: { selected: true, endingDay: true, color: "green" },
            }}
            markingType="period"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsCalendarVisible(false)}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  arrowIcon: {
    marginTop: 10,
    marginLeft: 3,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    color: "#333",
    fontSize: 16,
  },
  memoInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
