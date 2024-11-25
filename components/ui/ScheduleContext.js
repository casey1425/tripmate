import React, { createContext, useState } from "react";

export const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState({
    day1: [],
    day2: [],
    day3: [],
    day4: [],
  });

  // 전체 일정 데이터를 합쳐 반환
  const getAllSchedules = () => {
    return [
      ...schedules.day1,
      ...schedules.day2,
      ...schedules.day3,
      ...schedules.day4,
    ];
  };

  return (
    <ScheduleContext.Provider
      value={{ schedules, setSchedules, getAllSchedules }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
