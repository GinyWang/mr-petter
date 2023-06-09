import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Switch, Text } from "react-native-paper";
import {
  GetDevicePositionCommand,
  LocationClient,
} from "@aws-sdk/client-location";
//components
import Map from "./map";
import { REGION, TRACKER_DEVICE_ID, TRACKER_NAME } from "../../constants";

const MapScreen = (props) => {
  const { credentials } = props;
  const [petLocation, setPetLocation] = useState(null);
  const [locationClient, setLocationClient] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    const createLocationClient = async () => {
      const client = new LocationClient({
        credentials,
        region: REGION,
      });
      setLocationClient(() => client);
    };
    createLocationClient();
  }, []);

  const trackPet = async () => {
    const input = {
      TrackerName: TRACKER_NAME,
      DeviceId: TRACKER_DEVICE_ID,
    };
    try {
      const command = new GetDevicePositionCommand(input);
      const response = await locationClient.send(command);
      console.log(response);
      setPetLocation(() => ({
        long: response.Position[0],
        lat: response.Position[1],
        time: response.SampleTime,
        title: response.DeviceId,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTracking = () => {
    setIsTracking((t) => !t);
  };

  useEffect(() => {
    if (!isTracking) {
      clearInterval(interval.current);
      setPetLocation(null);
    } else {
      trackPet();
      interval.current = setInterval(() => {
        trackPet();
      }, 10000);
    }
  }, [isTracking]);

  return (
    <SafeAreaView>
      <Text variant="headlineSmall">Start Tracking</Text>
      <Switch value={isTracking} onValueChange={toggleTracking} />
      <Map petLocation={petLocation} />
    </SafeAreaView>
  );
};

export default MapScreen;
