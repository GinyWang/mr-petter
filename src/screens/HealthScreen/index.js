import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import HealthCalendar from "./healthCalendar";
import HealthControl from "./healthControl";
import FeedDialog from "./feedDialog";
import AddDialog from "./addDialog";
import AddSnackBar from "./addSnackBar";

const HealthScreen = (props) => {
  const { credentials } = props;
  const [dialogVisible, setDialogVisible] = useState({
    FEED: false,
    REMIND: false,
    ADD: false,
  });
  const [snackBarStatus, setSnackBarStatus] = useState({
    visible: false,
    content: "",
  });

  const toggleSnackBar = (v, text) => {
    setSnackBarStatus({ visible: v, content: text });
  };
  const showDialog = (msg) => {
    if (msg === "ADD") {
      setDialogVisible({ ...dialogVisible, ADD: true });
    } else if (msg === "FEED") {
      setDialogVisible({ ...dialogVisible, FEED: true });
    }
  };
  const hideDialog = (msg) => {
    if (msg === "ADD") {
      setDialogVisible({ ...dialogVisible, ADD: false });
    } else if (msg === "FEED") {
      setDialogVisible({ ...dialogVisible, FEED: false });
    } else if (msg == "ALL") {
      setDialogVisible({ FEED: false, REMIND: false, ADD: false });
    }
  };
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <HealthCalendar credentials={credentials} />
        <HealthControl showDialog={showDialog} hideDialog={hideDialog} />
        <FeedDialog
          credentials={credentials}
          visible={dialogVisible["FEED"]}
          toggleSnackBar={toggleSnackBar}
          hideDialog={hideDialog}
        />
        <AddDialog
          credentials={credentials}
          visible={dialogVisible["ADD"]}
          toggleSnackBar={toggleSnackBar}
          hideDialog={hideDialog}
        />
        <AddSnackBar
          visible={snackBarStatus.visible}
          hideSnackBar={() => toggleSnackBar(false)}
          content={snackBarStatus.content}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};
export default HealthScreen;
