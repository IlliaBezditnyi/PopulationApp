import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';

type Nation = {
  Nation: string;
  Year: string;
  Population: number;
}

// Creating async request to the API using AsyncThunk. Using rejectValue to handle error in request.
export const fetchNations = createAsyncThunk<Array<Nation>, undefined, {rejectValue: string}>(
  'nations/fetchNations',
  async function (_, { rejectWithValue }) {
    const request = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');

    // Handling the error, if server response isn't good.
    if (!request.ok) {
      return rejectWithValue('Server Error!');
    }

    const response = await request.json();

    return response.data;
  }
);

const nationSlice = createSlice({
  name: 'nations',
  // Setting the initial state of needed data.
  initialState: {
    list: [{Nation: '', Year: '', Population: 0}],
    loading: false,
    error: '',
  },
  reducers: {},
  // Handling every status of API request using extraReducers.
  extraReducers: (builder) => {
    builder
      .addCase(fetchNations.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchNations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      // addMatcher() is available with builder and receives function which return boolean status of the error.
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default nationSlice.reducer;

// Function which returns "true" if our async request executed with an error.
function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
