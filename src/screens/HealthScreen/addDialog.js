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
  const onPressAdd = () => {
    hideDialog("ADD");
    //todo: submit reminder to backend
    toggleSnackBar(
      true,
      `Feeding Reminder on ${timePicked.toTimeString()} Added `
    );
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
