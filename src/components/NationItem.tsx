import { View, Text, StyleSheet } from 'react-native';

interface NationItemProps {
  nations: any
}

const NationItem: React.FC<NationItemProps> = ({ nations }) => {
  const {Nation, Year, Population} = nations

  return (
    <View style={styles.container}>
      <Text>{Nation}</Text>
      <Text>{Year}</Text>
      <Text>{Population}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});


export default NationItem;