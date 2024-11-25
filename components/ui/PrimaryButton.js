import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress, isActive }) {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]} // 상태에 따라 스타일 적용
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: "#ddd", // 활성화된 버튼 배경색 (음영 효과)
  },
  activeButtonText: {
    color: "black", // 활성화된 버튼 텍스트 색상
    fontWeight: "bold", // 활성화된 텍스트 강조
  },
});
