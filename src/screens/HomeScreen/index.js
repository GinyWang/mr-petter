import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
const HomeScreen = (props) => {
  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar barStyle="dark-content" />
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
