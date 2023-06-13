import React from "react";
import { Snackbar } from "react-native-paper";

const AddSnackBar = ({ visible, hideSnackBar, content }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={hideSnackBar}
      duration={3000}
      action={{
        label: "Ok",
        onPress: hideSnackBar,
      }}
    >
      {content}
    </Snackbar>
  );
};

export default AddSnackBar;
