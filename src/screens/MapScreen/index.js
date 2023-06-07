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
  const [petLocation, setPetLocation] = useState({});

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
    //todo:use promise
    const command = new GetDevicePositionCommand(input);
    console.log(locationClient);
    const response = await locationClient.send(command);
    //todo: verify timestamp
    setPetLocation(() => {
      latitude: response.Position[0];
      longitude: response.Position[1];
      sampleTime: response.SampleTime;
    });
    setConsoleText(
      (t) => t + `trackPet${response.Position ? response.Position[1] : "None"}`
    );
    console.log(response);
    console.log({ petLocation });
  };

  return (
    <SafeAreaView>
      <Text>{consoleText}</Text>
      <Map region={initRegion} petLocation={petLocation} />
    </SafeAreaView>
  );
};

export default MapScreen;
