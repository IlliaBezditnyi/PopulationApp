import { View, useWindowDimensions, Text } from 'react-native';
import { FC } from 'react';
import Bar from './Bar';
import { BarDataProps } from '../types';

interface BarChartProps {
  data: BarDataProps[];
  yMaxValue: number;
}

const BarChart: FC<BarChartProps> = ({data, yMaxValue}) => {
  // Setting height of no filled bar.
  const chartHeight = 250;

  const {width} = useWindowDimensions();
  const margin = 5;

  // Function which calculates which height our chart bar need to fill.
  const calculateBarHeight = (barValue: BarDataProps) => {
    return (barValue.Population / yMaxValue) * chartHeight;
  };

  // Function which calculates which width our chart bar need to fill.
  const calculateBarWidth = () => {
    return width / data.length - margin * 2;
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {/* Mapping through our API data and rendering it in chart. */}
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
              <Text style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  paddingTop: 5
                }}
              >
                {bar.Year}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default BarChart;
