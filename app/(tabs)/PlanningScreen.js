import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { TripsContext } from "./TripsContext";
import RNPickerSelect from "react-native-picker-select";

export default function PlanningScreen({ navigation }) {
  const { addTrip } = useContext(TripsContext);

  const [destination, setDestination] = useState(""); // 여행지
  const [countryCode, setCountryCode] = useState("kr"); // 국가 코드
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]); // 국가 데이터
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      // 국가 데이터를 가공
      const formattedData = data.map((country) => ({
        label: country.translations.kor?.common || country.name.common, // 한국어 이름 (없으면 영어 이름)
        value: {
          destination: country.translations.kor?.common || country.name.common,
          countryCode: country.cca2.toLowerCase(), // 국가 코드 (소문자로 변환)
        },
      }));

      setDestinations(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("API 호출 에러:", error);
      Alert.alert("오류", "국가 데이터를 가져오는 데 실패했습니다.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
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
      countryCode,
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
        <RNPickerSelect
          onValueChange={(value) => {
            if (value) {
              setDestination(value.destination); // 여행지 설정
              setCountryCode(value.countryCode); // 국가 코드 설정
            }
          }}
          items={destinations}
          placeholder={{ label: "여행지를 선택하세요", value: null }}
          style={pickerStyles}
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
const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // 아이콘이나 텍스트 여백
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
};

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
