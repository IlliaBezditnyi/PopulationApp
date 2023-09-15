import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';

type Nation = {
  id: number;
  nation: string;
  year: string;
  population: number;
}

export const fetchNations = createAsyncThunk<Array<Nation>, undefined, {rejectValue: string}>(
  'nations/fetchNations',
  async function (_, { rejectWithValue }) {
    const request = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');

    if (!request.ok) {
      return rejectWithValue('Server Error!');
    }

    const response = await request.json();

    return response.data;
  }
);

const nationSlice = createSlice({
  name: 'nations',
  initialState: {
    list: [{}],
    loading: false,
    error: '',
  },
  reducers: {},
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default nationSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
