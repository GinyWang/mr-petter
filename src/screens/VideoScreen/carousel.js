// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";

const OFFSET = 40;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 200;
// const { width, height } = Dimensions.get("window");

const Carousel = (props) => {
  const { cards } = props;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const video = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const val = Math.round(value / ITEM_WIDTH);
      console.log(val);
      setVideoIndex(val);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);
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
        console.log(idx);
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
              <Video
                ref={video}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                }}
                source={{
                  uri: item.uri, // the video file
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={idx == videoIndex}
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
