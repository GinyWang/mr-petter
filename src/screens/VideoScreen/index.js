import React from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import Carousel from "./carousel";

const cards = [
  { title: "Dog 1", posterUrl: require("./images/dog1.jpg") },
  { title: "Dog 2", posterUrl: require("./images/dog2.jpeg") },
  { title: "Dog 3", posterUrl: require("./images/dog3.jpg") },
  { title: "Dog 4", posterUrl: require("./images/dog4.jpg") },
];

export default function AdvancedCardCarousel() {
  return (
    <SafeAreaView style={styles.container}>
      <Carousel cards={cards} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
});
