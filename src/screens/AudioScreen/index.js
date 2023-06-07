import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import AudioControl from "./audioControl";

const AudioScreen = (props) => {
  const { credentials } = props;
  return (
    <>
      <AudioControl credentials = {credentials}/>
    </>
  );
};

export default AudioScreen;
