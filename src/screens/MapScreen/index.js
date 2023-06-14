// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SNSClient, PublishCommand, $Command } from "@aws-sdk/client-sns";
import { Switch, Text } from "react-native-paper";
import {
  GetDevicePositionCommand,
  LocationClient,
  CalculateRouteCommand,
} from "@aws-sdk/client-location";
import Map from "./map";
import {
  REGION,
  ROUTE_CALCULATOR,
  TRACKER_DEVICE_ID,
  TRACKER_NAME,
} from "../../constants";

const MapScreen = (props) => {
  const { credentials, userInfo, userLocation } = props;
  const [petLocation, setPetLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [enableLostAlert, setEnableLostAlert] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (
      isTracking &&
      enableLostAlert &&
      petLocation != null &&
      userLocation != null
    ) {
      calculateRouteToPet();
    }
  }, [petLocation]);

  const calculateRouteToPet = async () => {
    const client = new LocationClient({
      credentials,
      region: REGION,
    });
    const input = {
      CalculatorName: ROUTE_CALCULATOR,
      DeparturePosition: [
        userLocation.coords.longitude,
        userLocation.coords.latitude,
      ],
      DestinationPosition: [petLocation.long, petLocation.lat],
      TravelMode: "Walking",
    };
    try {
      //calculate route
      const command = new CalculateRouteCommand(input);
      const response = await client.send(command);
      console.log("calculate route", response); //Response.Summary.Distance
      //send text alert
      if (response.Summary.Distance > 0.2) {
        console.log("send text to ", userInfo);
        await sendLostAlert(response.Summary.Distance);
        setEnableLostAlert(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const sendLostAlert = async (dist) => {
    try {
      const client = new SNSClient({ credentials, region: REGION });
      const input = {
        // PublishInput
        PhoneNumber: userInfo.attributes.phone_number,
        Message: `Your pet is at (latitude:${petLocation.lat}, longtitude:${petLocation.long}), ${dist} km from you!`,
        Subject: "Lost Alert",
      };
      const command = new PublishCommand(input);
      const response = await client.send(command);
      console.log("sent", response);
    } catch (e) {
      console.error(e);
    }
  };

  const trackPet = async () => {
    const input = {
      TrackerName: TRACKER_NAME,
      DeviceId: TRACKER_DEVICE_ID,
    };
    try {
      const client = new LocationClient({
        credentials,
        region: REGION,
      });
      const command = new GetDevicePositionCommand(input);
      const response = await client.send(command);
      if (
        response.Position[0] != petLocation?.long ||
        response.Position[1] != petLocation?.lat
      ) {
        setPetLocation({
          long: response.Position[0],
          lat: response.Position[1],
          time: response.SampleTime,
          title: response.DeviceId,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      setEnableLostAlert(false);
    }
  };
  const toggleEnableLostAlert = () => {
    if (isTracking) {
      setEnableLostAlert(!enableLostAlert);
    }
  };

  useEffect(() => {
    if (!isTracking) {
      clearInterval(interval.current);
      setPetLocation(null);
    } else {
      trackPet();
      interval.current = setInterval(() => {
        trackPet();
      }, 30000);
    }
  }, [isTracking]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 16,
        }}
      >
        <View>
          <Switch value={isTracking} onValueChange={toggleTracking} />
          <Text style={{ marginTop: 8 }}>Start Tracking</Text>
        </View>

        {isTracking && (
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: !enableLostAlert ? "red" : "gray",
                },
              ]}
              activeOpacity={0.2}
              onPress={toggleEnableLostAlert}
              disabled={!isTracking}
            >
              <Text style={styles.buttonText}>{"Lost Alert"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Map
        petLocation={petLocation}
        userLocation={userLocation}
        isTracking={isTracking}
        enableLostAlert={enableLostAlert}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
