import { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
//todo: array of pet Locations, pet info, geo fence
const Map = (props) => {
  const { petLocation, userLocation } = props;
  const isInitialZoomedRef = useRef(false);
  const mapViewRef = useRef(null);

  useEffect(() => {
    console.log({ petLocation });
  }, [petLocation]);

  useEffect(() => {
    console.log("zoom");
    if (userLocation != null && !isInitialZoomedRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    isInitialZoomedRef.current = false;
  }, [userLocation]);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {petLocation && (
          <Marker
            coordinate={{
              latitude: petLocation.lat,
              longitude: petLocation.long,
            }}
            title={petLocation.title}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  map: {
    height: "100%",
  },
});

export default Map;
