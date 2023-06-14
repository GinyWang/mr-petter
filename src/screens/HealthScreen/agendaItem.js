import React from "react";
import { StyleSheet, View, Text } from "react-native";

const AgendaItem = (props) => {
  const { item } = props;

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
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
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});

export default React.memo(AgendaItem);
