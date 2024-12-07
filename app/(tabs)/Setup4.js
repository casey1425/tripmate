import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Setup4 = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: "4",
      title: "새로운 앱 업데이트가 있습니다",
      date: "2024-11-25",
      content: "~ 상세 업데이트 내용 ~",
    },
    {
      id: "3",
      title: "공지사항 3",
      date: "2024-11-24",
      content: "여기에 자세한 정보가 들어갑니다.",
    },
    {
      id: "2",
      title: "공지사항 2",
      date: "2024-11-23",
      content: "여기에 자세한 정보가 들어갑니다.",
    },
    {
      id: "1",
      title: "공지사항 1",
      date: "2024-11-22",
      content: "여기에 자세한 정보가 들어갑니다.",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.announcementItem}
      onPress={() => handleAnnouncementClick(item)}
    >
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>공지사항</Text>

      <FlatList
        data={announcements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedAnnouncement && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedAnnouncement.title}
                </Text>
                <Text style={styles.modalDate}>
                  {selectedAnnouncement.date}
                </Text>
                <Text style={styles.modalContent}>
                  {selectedAnnouncement.content}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  announcementItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  announcementDate: {
    fontSize: 14,
    color: "#666",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Setup4;
