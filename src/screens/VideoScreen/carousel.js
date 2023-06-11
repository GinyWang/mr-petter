// @ts-nocheck
import React from "react";
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";

const OFFSET = 40;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 200;

const Carousel = (props) => {
  const { cards } = props;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={"normal"}
      snapToInterval={ITEM_WIDTH}
      style={styles.ScrollView}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={12}
    >
      {cards.map((item, idx) => {
        const inputRange = [
          (idx - 1) * ITEM_WIDTH,
          idx * ITEM_WIDTH,
          (idx + 1) * ITEM_WIDTH,
        ];

        const translate = scrollX.interpolate({
          inputRange,
          outputRange: [0.85, 1, 0.85],
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
        });

        return (
          <View key={item.title}>
            <Text variant="titleLarge" style={styles.Title}>
              {item.title}
            </Text>
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: idx === 0 ? OFFSET : undefined,
                marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
            >
              <ImageBackground
                source={item.posterUrl}
                style={styles.ImageBackground}
                imageStyle={{ borderRadius: 6 }}
              />
            </Animated.View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  ScrollView: { marginTop: 40, paddingHorizontal: 0 },
  Title: {
    color: "white",
    marginLeft: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  ImageBackground: { flex: 1, resizeMode: "cover", justifyContent: "center" },
});
