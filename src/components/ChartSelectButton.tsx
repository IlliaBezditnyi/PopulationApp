import {Text, Pressable, Dimensions} from 'react-native';
import React, {FC} from 'react';
import { ChartSelectButtonProps } from '../types';

const ChartSelectButton: FC<ChartSelectButtonProps> = ({text, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={text}
      hitSlop={10}
      style={({pressed}) => [
        {
          width: Dimensions.get('window').width / 2,
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          padding: 10, borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2
        },
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <Text style={{color: '#fff'}}>{text}</Text>
    </Pressable>
  );
};

export default ChartSelectButton;
