import React, { useEffect, useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationClient } from "@aws-sdk/client-location";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//components
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";

Amplify.configure(awsExports);
const Tab = createBottomTabNavigator();

const App = () => {
  const [credentials, setCredentials] = useState(null);
  const [locationClient, setLocationClient] = useState(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };
    const createLocationClient = async () => {
      const credentials = await Auth.currentCredentials();
      const client = new LocationClient({
        credentials,
        region: awsExports.aws_project_region,
      });
      setLocationClient(() => client);
      console.log("locationClient", client);
    };
    fetchCredentials();
    createLocationClient();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Map"
            children={() => <MapScreen locationClient={locationClient} />}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
export default withAuthenticator(App);
// export default App;
