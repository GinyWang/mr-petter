import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { GetDevicePositionCommand } from "@aws-sdk/client-location";
//components
import Map from "./map";

//todo: getUserLocation
const TrackerName = "PetTracker";
const DeviceId = "device";
//todo: temp const
const initRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const myMarker = {
  id: 1,
  latitude: 47.615686,
  longitude: -122.3381659,
  title: "Amplify Seattle",
  description: "Amplify Seattle Visit",
  image: "https://i.imgur.com/2nCt3Sbl.jpg",
};

const petMarkers = [
  {
    id: 1,
    latitude: 47.615686,
    longitude: -122.3381659,
    title: "Amplify Seattle",
    description: "Amplify Seattle Visit",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

const MapScreen = (props) => {
  const { locationClient } = props;
  const [consoleText, setConsoleText] = useState("MapScreen" + "\n");

  useEffect(() => {
    trackPet();
    const interval = setInterval(() => {
      trackPet();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const trackPet = async () => {
    const input = {
      TrackerName,
      DeviceId,
    };
    const command = new GetDevicePositionCommand(input);
    const response = await locationClient.send(command);

    setConsoleText(
      (t) => t + `trackPet${response ? (response[0], response[1]) : "None"}\n`
    );
    console.log(response);
  };

  return (
    <SafeAreaView>
      <Text>{consoleText}</Text>
      <Map region={initRegion} myMarker={myMarker} petMarkers={petMarkers} />
    </SafeAreaView>
  );
};

export default MapScreen;
