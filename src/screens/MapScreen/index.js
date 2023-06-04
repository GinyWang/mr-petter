import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const getInitRegion = () => ({
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});
const getMarkerLocations = () => [
  {
    id: 1,
    latitude: 47.615686,
    longitude: -122.3381659,
    title: "Amplify Seattle",
    description: "Amplify Seattle Visit",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

const MapScreen = () => {
  return (
    <SafeAreaView>
      <Text>MapScreen</Text>
      <MapView
        style={{ height: 500 }}
        initialRegion={getInitRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {getMarkerLocations().map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;
