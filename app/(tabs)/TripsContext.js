import React, { createContext, useState } from "react";

export const TripsContext = createContext();

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  const addTrip = (trip) => {
    setTrips((prevTrips) => [...prevTrips, trip]);
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripsContext.Provider>
  );
};
