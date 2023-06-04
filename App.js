import "react-native-gesture-handler";
import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import awsExports from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@aws-amplify/ui-react";
//components
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";

Amplify.configure(awsExports);

const screens = [{ name: "MapScreen", component: MapScreen }];

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
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
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
export default withAuthenticator(App);
// export default App;
