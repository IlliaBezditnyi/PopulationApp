import {View, useWindowDimensions, Text} from 'react-native';
import React, {FC} from 'react';
import Bar from './Bar';
import {BarDataProps} from '../types';

interface BarChartProps {
  data: BarDataProps[];
  yMaxValue: number;
}

const BarChart: FC<BarChartProps> = ({data, yMaxValue}) => {
  const chartHeight = 250;
  const {width} = useWindowDimensions();
  const margin = 4;

  const calculateBarHeight = (barValue: BarDataProps) => {
    return (barValue.Population / yMaxValue) * chartHeight;
  };

  const calculateBarWidth = () => {
    return width / data.length - margin * 2;
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {data.map((bar, index) => {
          const barHeight = calculateBarHeight(bar);
          const barWidth = calculateBarWidth();
          return (
            <View key={index.toString()}>
              <Bar
                barMargin={margin}
                barHeight={barHeight}
                barWidth={barWidth}
                totalHeight={chartHeight}
                population={bar.Population}
              />
              <Text style={{alignSelf: 'center', textAlign: 'center', color: '#fff', paddingTop: 5}}>
                {bar.Year}
              </Text>
            </View>
          );
        }).reverse()}
      </View>
      <View style={{flexDirection: 'row'}}></View>
    </>
  );
};

export default BarChart;