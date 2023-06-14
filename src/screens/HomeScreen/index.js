import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const HomeScreen = ({ email, phone, handleSignout }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, </Text>
        <Text style={styles.infoText}>Phone:{phone}</Text>
        <Text style={styles.infoText}>Email:{email}</Text>
        <Button icon="hand-wave" mode="contained" onPress={handleSignout}>
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 16,
  },
});
export default HomeScreen;
