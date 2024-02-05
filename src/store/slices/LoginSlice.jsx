import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const loginAdapter = createEntityAdapter();

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      // Simulating the API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Your authentication logic goes here (replace this with your actual logic)
      const data = { token: "your_token_here" };

      return data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState: loginAdapter.getInitialState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  }),
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        loginAdapter.upsertOne(state, payload); // Store data in the entity adapter
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = LoginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginAdapter.reducer; // Export the reducer for use in the store configuration
