import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TripsContext = createContext();

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]); // 기본값 빈 배열
  const [notifications, setNotifications] = useState([]); // 알림 상태 추가
  const [unread, setUnread] = useState(false); // 알림 읽음 상태
  // 데이터를 로드하는 기능 제거 (주석 처리된 loadTripsFromStorage)
  const loadTripsFromStorage = async () => {
    try {
      const storedTrips = await AsyncStorage.getItem("trips");
      if (storedTrips) {
        setTrips(JSON.parse(storedTrips));
        console.log("Trips loaded from storage:", JSON.parse(storedTrips));
      }
    } catch (error) {
      console.error("Failed to load trips:", error);
    }
  };

  // `useEffect`에서 호출되는 데이터 로드 제거
  // useEffect(() => {
  //   loadTripsFromStorage();
  // }, []);

  // `trips` 상태가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    const saveTripsToStorage = async (tripsData) => {
      try {
        await AsyncStorage.setItem("trips", JSON.stringify(tripsData));
        console.log("Trips saved to storage:", tripsData);
      } catch (error) {
        console.error("Failed to save trips:", error);
      }
    };

    saveTripsToStorage(trips);
  }, [trips]);
  const addNotification = (notif) => {
    setNotifications((prev) => [...prev, notif]);
    setUnread(true);
  };
  const clearNotifications = () => {
    setUnread(false); // 모든 알림을 읽음으로 처리
  };
  // 안전하게 `trip` 데이터를 가져오는 함수 추가
  const getTrip = (index) => trips[index] || { budget: 0, days: [] };

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      createdAt: new Date().toISOString(),
      flags: { alertSent: false, zeroAlertSent: false },
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  // 여행 업데이트
  const updateTrip = (index, updatedTrip, updatedRemaining) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip, i) =>
        i === index
          ? {
              ...trip,
              ...updatedTrip,
              days: updatedTrip.days || trip.days,
              flags: updatedTrip.flags || trip.flags,
            }
          : trip
      )
    );

    // remaining 동기화
    if (updatedRemaining) {
      setRemaining(updatedRemaining);
    }
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        getTrip,
        addNotification,
        notifications,
        unread,
        clearNotifications,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};
