import {View, Text} from 'react-native';
import React, {FC, useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface BarProps {
  totalHeight: number;
  barHeight: number;
  barWidth: number;
  barMargin: number;
  population: number;
}

const Bar: FC<BarProps> = ({totalHeight, barHeight, barWidth, barMargin, population}) => {
  const animatedHeight = useSharedValue<number>(0);

  useEffect(() => {
    animatedHeight.value = withTiming(barHeight);
  }, [barHeight, animatedHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View
      style={{
        height: totalHeight,
        width:barWidth,
        marginHorizontal: barMargin,
        backgroundColor: '#3a475c',
        flexDirection: 'row',
        borderRadius: 20
    }}
    >
      <Animated.View
        style={[
          {
            width: barWidth,
            backgroundColor: '#8fdf8f',
            borderRadius: 20,
            alignSelf: 'flex-end',
            justifyContent: 'center',
            flexWrap: 'wrap'
          },
          animatedStyle,
        ]}
      >
        <Text style={{transform: [{ rotate: '-90deg'}]}}>{population}</Text>
      </Animated.View>
    </View>
  );
};

export default Bar;