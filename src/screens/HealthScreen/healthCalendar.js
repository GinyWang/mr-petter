import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
  WeekCalendar,
  AgendaList,
} from "react-native-calendars";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import AgendaItem from "./agendaItem";

const today = new Date().toISOString().split("T")[0];

const events = [
  {
    title: "2023-06-10",
    data: [{ hour: "12:00 am", title: "Feed" }],
  },
  {
    title: "2023-06-11",
    data: [
      { hour: "12:00 am", title: "Feed" },
      { hour: "6:00 pm", title: "Feed" },
    ],
  },
  {
    title: "2023-06-12",
    data: [
      { hour: "12:00 am", title: "Feed" },
      { hour: "6:00 pm", title: "Feed" },
    ],
  },
  {
    title: "2023-06-13",
    data: [
      { hour: "12:00 am", title: "Feed" },
      { hour: "6:00 pm", title: "Feed" },
      { hour: "8:00 pm", title: "Poop" },
    ],
  },
];
function getMarkedDates() {
  const marked = {};

  events.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}

const HealthCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [eventsForDay, setEventsForDay] = useState([]);

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  const marked = useRef(getMarkedDates());
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    setEventsForDay(events.filter((event) => event.title === selectedDate));
  }, [selectedDate]);

  const getEventsForDay = (date) => {
    return events.filter((event) => event.date === date);
  };

  return (
    <View style={{ flex: 1 }}>
      <CalendarProvider date={today} showTodayButton disabledOpacity={0.6}>
        <ExpandableCalendar
          firstDay={1}
          animateScroll
          markedDates={marked.current}
          onDayPress={onDayPress}
        />
        {eventsForDay.length > 0 ? (
          <AgendaList
            sections={eventsForDay}
            renderItem={renderItem}
            scrollToNextEvent
          />
        ) : (
          <View style={styles.emptyItem}>
            <Text style={styles.emptyItemText}>No Events</Text>
          </View>
        )}
      </CalendarProvider>
    </View>
  );
};

export default HealthCalendar;

const styles = StyleSheet.create({
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
