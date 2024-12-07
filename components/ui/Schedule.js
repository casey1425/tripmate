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
  ScrollView,
} from "react-native";

export default function Schedule({
  data = [],
  onUpdate = () => {},
  hideInput = false,
}) {
  const [newSchedule, setNewSchedule] = useState("");

  const addSchedule = () => {
    if (newSchedule.trim()) {
      const updated = [...data, { id: Date.now(), text: newSchedule }];
      onUpdate(updated); // 부모로 전달
      setNewSchedule("");
    }
  };

  const removeSchedule = (id) => {
    const updated = data.filter((item) => item.id !== id);
    onUpdate(updated); // 부모로 전달
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
            onPress={() => removeSchedule(item.id)}
            disabled={hideInput}
          >
            <Text style={styles.listText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 입력창과 추가 버튼 */}
      {!hideInput && (
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newSchedule}
              onChangeText={setNewSchedule}
              placeholder="새 일정 입력"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.addButton} onPress={addSchedule}>
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EFFF",
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#F8EFFF",
    paddingVertical: 5,
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
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
  inputWrapper: {
    backgroundColor: "#F8EFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
