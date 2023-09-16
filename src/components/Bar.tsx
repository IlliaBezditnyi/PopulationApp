import { View, Text } from 'react-native';
import { FC, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BarProps } from '../types';

const Bar: FC<BarProps> = ({totalHeight, barHeight, barWidth, barMargin, population}) => {
  // Storing the height of bar animation.
  const animatedHeight = useSharedValue<number>(0);

  // The shared value is then set to the desired height in a UseEffect.
  // So animation should work every time when data changes or screen loads.
  useEffect(() => {
    animatedHeight.value = withTiming(barHeight);
  }, [barHeight, animatedHeight]);

  // Pass the initial height to an animated style using the UseAnimatedStyle hook.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View
      style={{
        height: totalHeight,
        width: barWidth,
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
            alignItems: 'center'
          },
          animatedStyle,
        ]}
      >
        <Text style={{textAlign: 'center'}}>Population: {population}</Text>
      </Animated.View>
    </View>
  );
};

export default Bar;
