import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { FAB } from "react-native-paper";

import { PI_CONTROL_LAMBDA_NAME, REGION } from "../../constants.js";
import { makeLambdaPayload } from "../../utils.js";

const AudioControl = (props) => {
  const { credentials } = props;
  const [playing, setPlaying] = useState(true);

  const invokeAudioControl = async (msg) => {
    const config = {
      region: REGION,
      credentials: credentials,
    };
    const input = {
      // InvocationRequest
      FunctionName: PI_CONTROL_LAMBDA_NAME,
      Payload: makeLambdaPayload({
        type: "interaction/music",
        action: msg,
      }),
    };
    try {
      const client = new LambdaClient(config);
      const command = new InvokeCommand(input);
      await client.send(command);
    } catch (e) {
      console.error(e);
    }
  };

  const togglePlay = async () => {
    if (playing) {
      await invokeAudioControl("stop");
    } else {
      await invokeAudioControl("play");
    }
    setPlaying((p) => !p);
  };

  const onPressNext = async () => {
    await invokeAudioControl("next");
  };

  const onPressPrev = async () => {
    await invokeAudioControl("prev");
  };

  return (
    <>
      <View style={styles.container}>
        <FAB icon="skip-previous" onPress={() => onPressPrev()} />
        <FAB icon="play-pause" onPress={() => togglePlay()} />
        <FAB icon="skip-next" onPress={() => onPressNext()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
export default AudioControl;
