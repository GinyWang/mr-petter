import React, { useEffect, useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//components
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import AudioScreen from "./src/screens/AudioScreen";

Amplify.configure(awsExports);
const Tab = createBottomTabNavigator();

const App = () => {
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        setCredentials(await Auth.currentUserCredentials());
      } catch (e) {
        console.log(e);
      }
    };
    fetchCredentials();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Map"
            children={() => <MapScreen credentials={credentials} />}
          />
          <Tab.Screen
            name="Audio"
            children={() => <AudioScreen credentials={credentials} />}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
export default withAuthenticator(App);
// export default App;
