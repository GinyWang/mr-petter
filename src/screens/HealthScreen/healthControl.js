import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { useState } from "react";

const HealthControl = (props) => {
  const { showDialog, hideDialog } = props;
  const [fabOpen, setFabOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState({
    FEED: false,
    REMIND: false,
    ADD: false,
  });

  const onStateChange = ({ open }) => setFabOpen(open);

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={fabOpen}
          visible
          icon={fabOpen ? "calendar-today" : "dog"}
          actions={[
            {
              icon: "plus",
              label: "Add",
              onPress: () => showDialog("ADD"),
            },
            {
              icon: "food-drumstick",
              label: "Feed Now",
              onPress: () => showDialog("FEED"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (fabOpen) {
              hideDialog("ALL");
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};
export default HealthControl;
