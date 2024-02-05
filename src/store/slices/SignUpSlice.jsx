import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const signupAdapter = createEntityAdapter();

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ firstname, lastname, email, password }, thunkAPI) => {
    try {
      // Simulating the API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Your registration logic goes here (replace this with your actual logic)
      const data = { token: "your_token_here" };

      return data;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const SignupSlice = createSlice({
  name: "signup",
  initialState: signupAdapter.getInitialState({
    token: "",
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
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        signupAdapter.upsertOne(state, payload); // Store data in the entity adapter
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = SignupSlice.actions;

export const signupSelector = (state) => state.signup;

export default signupAdapter.reducer; // Export the reducer for use in the store configuration
