import { FC, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { fetchNations } from '../store/nationSlice';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import BarChart from '../components/BarChart';

const maxValue = 326569308;

const PopulationScreen: FC = () => {
  const dispatch = useAppDispatch();
  const nations = useAppSelector(state => state.nations.list);
  const { loading, error } = useAppSelector(state => state.nations);

  useEffect(() => {
    dispatch(fetchNations());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header title="Population" />
      {loading && <Text style={{color: '#fff', textAlign: 'center'}}>Loading...</Text>}
      {error && <Text style={{color: '#fff', textAlign: 'center'}}>An error occured: {error}</Text>}
      <BarChart yMaxValue={maxValue} data={nations} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 150,
    backgroundColor: '#293241',
  }
});

export default PopulationScreen;