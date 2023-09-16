import { configureStore } from '@reduxjs/toolkit';
import nationReducer from './nationSlice';

const store = configureStore({
  reducer: {
    nations: nationReducer,
  },
});

export default store;

// Define two additional types for creating custom hooks based on them.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
