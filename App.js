import React, { useEffect, useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as ExpoLocation from "expo-location";
//components
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import AudioScreen from "./src/screens/AudioScreen";
import VideoScreen from "./src/screens/VideoScreen";
import HealthScreen from "./src/screens/HealthScreen";

Amplify.configure(awsExports);
const Tab = createBottomTabNavigator();

const App = () => {
  const [credentials, setCredentials] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // aws user auth
    const fetchCredentials = async () => {
      try {
        setCredentials(await Auth.currentUserCredentials());
        setUserInfo(await Auth.currentUserInfo());
      } catch (e) {
        console.error(e);
      }
    };
    fetchCredentials();
    // get current location
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await ExpoLocation.getCurrentPositionAsync({});
      setUserLocation(location);
      // console.log(location);
    })();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator>
          {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
          <Tab.Screen
            name="Map"
            children={() => (
              <MapScreen
                credentials={credentials}
                userInfo={userInfo}
                userLocation={userLocation}
              />
            )}
          />
          <Tab.Screen
            name="Audio"
            children={() => <AudioScreen credentials={credentials} />}
          />
          <Tab.Screen
            name="Video"
            children={() => <VideoScreen credentials={credentials} />}
          />
          <Tab.Screen
            name="Health"
            children={() => <HealthScreen credentials={credentials} />}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
export default withAuthenticator(App);
// export default App;
