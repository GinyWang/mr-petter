import { useEffect } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

//todo: get user location, pet info
const Map = (props) => {
  const { initRegion, petLocation } = props;

  useEffect(() => {
    console.log({ petLocation });
  }, [petLocation]);

  return (
    <>
      <MapView
        style={{ height: 700 }}
        initialRegion={initRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {petLocation && (
          <Marker
            key="1"
            coordinate={{
              latitude: petLocation.latitude,
              longitude: petLocation.longitude,
            }}
            title="petName"
            description={petLocation.sampleTime}
          />
        )}
      </MapView>
    </>
  );
};
export default Map;
