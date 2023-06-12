import * as React from "react";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Text, Button, Dialog, Portal } from "react-native-paper";
import { TextInput, View } from "react-native";
import { PI_CONTROL_LAMBDA_NAME, REGION } from "../../constants.js";
import { useForm } from "react-hook-form";
import { makeLambdaPayload } from "../../utils.js";

const AddDialog = (props) => {
  const { visible, hideDialog, credentials } = props;
  const onPressCancel = () => {
    hideDialog("ADD");
  };
  //   const onPressAdd = async () => {
  //     //todo: add event
  //     onSubmit={handleSubmit(onSubmit)}
  //     hideDialog("ADD");
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //todo: register new event}
    console.log(errors);
    hideDialog("ADD");
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text>Add Event</Text>
        </Dialog.Title>
        <Dialog.Content>
          {/* <View>
            <TextInput editable multiline />

            <select {...register("Event", { required: true })}>
              <option value="Feed">Feed</option>
              <option value="Poop">Poop</option>
              <option value="Walk">Walk</option>
              <option value="Others">Others</option>
            </select>
            <Input
              type="datetime-local"
              placeholder="Time"
              {...register("Time", { required: true, max: -1 })}
            />
            <textarea {...register("Description", {})} />
          </View> */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onSubmit} mode="contained">
            Add
          </Button>
          <Button onPress={onPressCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddDialog;
