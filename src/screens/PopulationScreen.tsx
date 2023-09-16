import { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fetchNations } from '../store/nationSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import Header from '../components/Header';
import BarChart from '../components/BarChart';
import ChartSelectButton from '../components/ChartSelectButton';

// Max value of population for calculation of chart bar height.
const maxValue = 326569308;

const PopulationScreen: FC = () => {
  const [buttonState, setButtonState] = useState<'first' | 'last'>('first');

  const dispatch = useAppDispatch();
  const nations = useAppSelector(state => state.nations.list);
  const { loading, error } = useAppSelector(state => state.nations);

  useEffect(() => {
    dispatch(fetchNations());
  }, [dispatch]);

  // Function for changing button state.
  const handleButtonPress = () => {
    const newButtonState = buttonState === 'first' ? 'last' : 'first';
    return setButtonState(newButtonState);
  };

  // Function which devides our initial data from API on 2 arrays, to make functionality of "Change period" button.
  const getChartData = () => {
    const firstYears = [];
    const lastYears = [];

    for (let i = nations.length - 1; i >= nations.length / 2; i--) {
      firstYears.push(nations[i])
    }

    for (let i = 0; i < nations.length / 2; i++) {
      lastYears.push(nations[i])
    }

    // If button state is "first" we show to user first period of years, otherwise we render second period of years.
    return buttonState === 'first' ? firstYears : lastYears.reverse();
  }

  return (
    <View style={styles.container}>
      <Header title="Population" />

      {/* Rendering info text when app is loading or error is occured */}
      {loading && <Text style={{color: '#fff', textAlign: 'center'}}>Loading...</Text>}
      {error && <Text style={{color: '#fff', textAlign: 'center'}}>An error occured: {error}</Text>}

      <View style={{gap: 30}}>
        <Text style={styles.title}>United States</Text>
        <BarChart yMaxValue={maxValue} data={getChartData()} />
        <ChartSelectButton onPress={handleButtonPress} text={'Change period'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293241',
    gap: 150
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800'
  }
});

export default PopulationScreen;
