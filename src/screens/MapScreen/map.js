import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

//todo: get user location
const Map = (props) => {
  const { initRegion, myMarker, petMarkers } = props;
  return (
    <>
      <MapView
        style={{ height: 500 }}
        initialRegion={initRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* //todo: myMarker & trackerMarker */}
        {petMarkers.map((marker) => (
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
    </>
  );
};
export default Map;
