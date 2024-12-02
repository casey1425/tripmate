import React, { createContext, useState } from "react";

export const TripsContext = createContext();

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  // 여행 데이터를 추가하는 함수
  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      createdAt: new Date().toISOString(), // 현재 시간 추가
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  // 여행 데이터를 업데이트하는 함수
  const updateTrip = (index, updatedTrip) => {
    setTrips((prevTrips) => {
      // 기존 데이터를 깊게 복사
      const newTrips = prevTrips.map((trip, i) => {
        if (i === index) {
          // days가 있는 경우 병합
          return {
            ...trip,
            ...updatedTrip,
            days: updatedTrip.days || trip.days, // days가 제공되지 않은 경우 기존 유지
          };
        }
        return trip;
      });
      return newTrips;
    });
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip }}>
      {children}
    </TripsContext.Provider>
  );
};
