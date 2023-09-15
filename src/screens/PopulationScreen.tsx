import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { fetchNations } from '../store/nationSlice';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import NationItem from '../components/NationItem';

const PopulationScreen: FC = () => {
  const dispatch = useAppDispatch();
  const nations = useAppSelector(state => state.nations.list);

  useEffect(() => {
    dispatch(fetchNations());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header title="Population" />
      {
        nations.map((item) => (
          <NationItem nations={item} />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});

export default PopulationScreen;