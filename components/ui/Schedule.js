import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Schedule({ data = [], onUpdate = () => {} }) {
  const [newSchedule, setNewSchedule] = useState("");

  const addSchedule = () => {
    if (newSchedule.trim()) {
      const updated = [...data, { id: Date.now(), text: newSchedule }];
      onUpdate(updated); // 상위 컴포넌트로 업데이트 전달
      setNewSchedule("");
    }
  };

  const removeSchedule = (id) => {
    const updated = data.filter((item) => item.id !== id); // 해당 ID 제거
    onUpdate(updated); // 상위 컴포넌트로 업데이트 전달
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 일정 리스트 */}
      <View style={styles.listContainer}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => removeSchedule(item.id)} // 터치 시 제거
          >
            <Text style={styles.listText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 입력창과 추가 버튼 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newSchedule}
          onChangeText={setNewSchedule}
          placeholder="새 일정 입력"
          placeholderTextColor="#888"
        />
        <Button title="추가" onPress={addSchedule} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EFFF",
    padding: 10,
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
});
