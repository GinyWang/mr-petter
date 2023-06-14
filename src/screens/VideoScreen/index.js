import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Carousel from "./carousel";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { REGION } from "../../constants";

const cards = [
  {
    title: "Dog 1",
    uri: "https://team07-final.s3.amazonaws.com/interaction/2023-06-12%2C22%3A42.mp4",
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

export default function VideoScreen({ credentials }) {
  // useEffect( () => {
  //   const config = {
  //     region: REGION,
  //     credentials: credentials,
  //   };
  //   try {
  //     const client = new S3Client(config);
  //     const command = new GetObjectCommand(input);
  //     const response = await client.send(command);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },[]);

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
