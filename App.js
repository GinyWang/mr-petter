import React, { useEffect, useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationClient } from "@aws-sdk/client-location";
//components
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";

Amplify.configure(awsExports);

const screens = [{ name: "MapScreen", component: MapScreen }];

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

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <MapScreen locationClient={locationClient} />
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          style={{ flex: 2 }}
        >
          <Stack.Navigator initialRouteName="MapScreen">
            {screens.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{ headerShown: false }}
              />
            ))}
          </Stack.Navigator>
        </KeyboardAvoidingView> */}
    </SafeAreaProvider>
  );
};
export default withAuthenticator(App);
// export default App;
