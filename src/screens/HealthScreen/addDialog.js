import React, { useState } from "react";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Text, Button, Dialog, Portal } from "react-native-paper";
import { View } from "react-native";
import { PI_CONTROL_LAMBDA_NAME, REGION } from "../../constants.js";
import { makeLambdaPayload } from "../../utils.js";
import DateTimePicker from "@react-native-community/datetimepicker";
const AddDialog = (props) => {
  const { visible, hideDialog, credentials, toggleSnackBar } = props;
  const [timePicked, setTimePicked] = useState(new Date());

  const onPressCancel = () => {
    hideDialog("ADD");
  };
  const onPressAdd = async () => {
    hideDialog("ADD");
    //submit reminder to backend
    await invokeAddReminder();
    toggleSnackBar(
      true,
      `Feeding Reminder on ${timePicked.toTimeString()} Added `
    );
  };
  const invokeAddReminder = async () => {
    const config = {
      region: REGION,
      credentials: credentials,
    };
    const formattedTime = timePicked.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const input = {
      // InvocationRequest
      FunctionName: PI_CONTROL_LAMBDA_NAME,
      Payload: makeLambdaPayload({
        type: "health/feeding",
        scheduled: "Yes",
        action: "feed",
        scheduled_time: formattedTime,
      }),
    };
    try {
      const client = new LambdaClient(config);
      const command = new InvokeCommand(input);
      const res = await client.send(command);
      // console.log("schedule reminder", res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text>Add Feeding Reminder</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>Every day on : </Text>
          <DateTimePicker
            value={new Date()}
            mode="time"
            onChange={(_event, date) => setTimePicked(date)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressAdd} mode="contained">
            Add
          </Button>
          <Button onPress={onPressCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddDialog;
