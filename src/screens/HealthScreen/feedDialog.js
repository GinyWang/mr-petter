import * as React from "react";
import { Text, Button, Dialog, Portal } from "react-native-paper";
import { makeLambdaPayload } from "../../utils.js";
import { PI_CONTROL_LAMBDA_NAME, REGION } from "../../constants.js";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const FeedDialog = (props) => {
  const { visible, hideDialog, credentials, toggleSnackBar } = props;
  const onPressCancel = () => {
    hideDialog("FEED");
  };
  const onPressYes = async () => {
    hideDialog("FEED");
    toggleSnackBar(true, "Feeding...");
    await invokeFeed();
    toggleSnackBar(true, "Feeding Complete!");
  };
  const invokeFeed = async () => {
    const config = {
      region: REGION,
      credentials: credentials,
    };
    const input = {
      // InvocationRequest
      FunctionName: PI_CONTROL_LAMBDA_NAME,
      Payload: makeLambdaPayload({
        type: "health/feeding",
        action: "feed",
      }),
    };
    try {
      const client = new LambdaClient(config);
      const command = new InvokeCommand(input);
      const res = await client.send(command);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text>Feed Now !</Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onPressYes} mode="contained">
            Yes
          </Button>
          <Button onPress={onPressCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default FeedDialog;
