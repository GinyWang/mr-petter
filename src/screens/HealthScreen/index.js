import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import HealthCalendar from "./healthCalendar";
import HealthControl from "./healthControl";
import FeedDialog from "./feedDialog";
import AddDialog from "./addDialog";

const HealthScreen = (props) => {
  const { credentials } = props;
  const [dialogVisible, setDialogVisible] = useState({
    FEED: false,
    REMIND: false,
    ADD: false,
  });
  const showDialog = (msg) => {
    if (msg === "ADD") {
      setDialogVisible({ ...dialogVisible, ADD: true });
    } else if (msg === "REMIND") {
      setDialogVisible({ ...dialogVisible, REMIND: true });
    } else if (msg === "FEED") {
      setDialogVisible({ ...dialogVisible, FEED: true });
    }
  };
  const hideDialog = (msg) => {
    if (msg === "ADD") {
      setDialogVisible({ ...dialogVisible, ADD: false });
    } else if (msg === "REMIND") {
      setDialogVisible({ ...dialogVisible, REMIND: false });
    } else if (msg === "FEED") {
      setDialogVisible({ ...dialogVisible, FEED: false });
    } else if (msg == "ALL") {
      setDialogVisible({ FEED: false, REMIND: false, ADD: false });
    }
  };
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <HealthCalendar />
        <HealthControl showDialog={showDialog} hideDialog={hideDialog} />
        <FeedDialog
          credentials={credentials}
          visible={dialogVisible["FEED"]}
          hideDialog={hideDialog}
        />
        <AddDialog
          credentials={credentials}
          visible={dialogVisible["ADD"]}
          // visible={true}e
          hideDialog={hideDialog}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};
export default HealthScreen;
