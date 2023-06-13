import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Carousel from "./carousel";

const cards = [
  {
    title: "Dog 1",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    title: "Dog 2",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    title: "Dog 3",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    title: "Dog 4",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
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
