// @ts-nocheck
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
// import { Modal, Portal, PaperProvider } from "react-native-paper";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const AgendaItem = (props) => {
  const { item } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <GestureHandlerRootView>
      <TouchableOpacity style={styles.item} onPress={showModal}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={hideModal}
            activeOpacity={1}
          >
            <Image
              source={{ uri: item.uri }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    // backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  modalContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});

export default React.memo(AgendaItem);
