import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
//todo: array of pet Locations, pet info, geo fence
const Map = (props) => {
  const { petLocation } = props;

  useEffect(() => {
    console.log({ petLocation });
  }, [petLocation]);

  return (
    <View style={styles.container}>
      <MapView
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
