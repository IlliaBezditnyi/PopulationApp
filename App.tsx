import { Provider } from 'react-redux';
import store from './src/store';
import PopulationScreen from './src/screens/PopulationScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PopulationScreen />
    </Provider>
  );
}
