// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const TimeGrid = ({
  listSchedule = [
    { day: "2022-3-28", startAt: "6:45", endAt: "9:10" },
    { day: "2022-3-28", startAt: "12:30", endAt: "14:55" },
    { day: "2022-3-29", startAt: "10:15", endAt: "11:45" },
    { day: "2022-3-29", startAt: "12:30", endAt: "14:55" },
  ],
  ngayKhaiGiang,
}) => {
  const refs = useRef();
  const [state, setState] = useState({});
  useEffect(() => {
    createCalendar();
  }, [listSchedule]);

  const createCalendar = () => {
    const calendar = new Calendar(refs.current, {
      plugins: [timeGridPlugin],
      events: (listSchedule || []).map((item, index) => {
        return {
          id: index,
          start: moment(
            moment(item.day, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD ") +
              item.startAt,
            "YYYY-MM-DD HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm:ss"),
          end: moment(
            moment(item.day, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD ") +
              item.endAt,
            "YYYY-MM-DD HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm:ss"),
          backgroundColor: "var(--red)",
          borderColor: "var(--red)",
        };
      }),
      //   dayHeaderContent: (date) =>
      //     constants.day[date.dow].label + " " + moment(date.date).format("DD/MM"),
      // dayCellContent: (a, b, c, d) => "",
      // firstDay: 1,
      allDaySlot: null,
      slotDuration: "01:00:00",
      headerToolbar: {
        left: "",
        end: "today prev,next",
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      //   initialDate: new Date(ngayKhaiGiang),
      // slotLabelContent: (a) => {
      // },
      height: "400px",
      slotMinTime: "06:00",
      slotMaxTime: "22:00",
    });
    calendar.render();
  };
  return <div className="calendar" ref={refs}></div>;
};

export default TimeGrid;
