import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
} from "react-native-calendars";
import { StyleSheet, Alert, View, Text, Button } from "react-native";
import AgendaItem from "./agendaItem";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { REGION, S3_BUCKET_NAME } from "../../constants";

const today = new Date().toISOString().split("T")[0];

const HealthCalendar = ({ credentials }) => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [eventsForDay, setEventsForDay] = useState([]);
  const events = useRef({});

  useEffect(() => {
    const fetchFeedEvents = async () => {
      try {
        const s3Client = new S3Client({
          region: REGION,
          credentials: credentials,
        });
        // Fetch the list of objects in the S3 bucket
        const listObjectsCommand = new ListObjectsCommand({
          Bucket: S3_BUCKET_NAME,
          Prefix: "health/",
        });
        const { Contents } = await s3Client.send(listObjectsCommand);
        const jpgFiles = Contents.filter((object) =>
          object.Key.endsWith(".jpg")
        );

        // construct the events dict
        const eventsDict = {};
        jpgFiles.forEach((object) => {
          const regex = /(\d{4}-\d{2}-\d{2}),(\d{2}:\d{2})/;
          const match = object.Key.match(regex);
          const d = match[1];
          const t = match[2];
          if (eventsDict[d]) {
            eventsDict[d].push({
              hour: t,
              title: "Feed",
              uri: `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${object.Key}`,
            });
          } else {
            eventsDict[d] = [
              {
                hour: t,
                title: "Feed",
                uri: `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${object.Key}`,
              },
            ];
          }
        });

        // console.log(eventsDict);
        events.current = eventsDict;
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeedEvents();
  });
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    setEventsForDay(
      selectedDate in events.current
        ? [
            {
              title: selectedDate,
              data: events.current[selectedDate],
            },
          ]
        : []
    );
    // console.log(eventsForDay);
  }, [selectedDate]);

  return (
    <View style={{ flex: 1 }}>
      <CalendarProvider date={today} disabledOpacity={0.6}>
        <ExpandableCalendar
          firstDay={1}
          animateScroll
          onDayPress={onDayPress}
        />
        {eventsForDay?.length > 0 ? (
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
