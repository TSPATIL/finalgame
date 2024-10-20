import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUser, loginUser, getAllUsers, getUserDetails, getUserDetailsByParams } from './AuthenticationAPIFunc';

const initialState = {
  loading: false,
  user: null,
  error: null,
  status: 'idle'
}

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
)

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await loginUser(userData);
    return response.data;
  }
)
export const getAllUsersAsync = createAsyncThunk(
  "user/gatAllUsers",
  async () => {
    const response = await getAllUsers(userData);
    return response.data;
  }
)

export const getUserDetailsAsync = createAsyncThunk(
  "user/getUserDetails",
  async () => {
    const response = await getUserDetails(userData);
    return response.data;
  }
)

export const getUserDetailsByParamAsync = createAsyncThunk(
  "user/getUserDetailsByParam",
  async () => {
    const response = await getUserDetailsByParams(userData);
    return response.data;
  }
)

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
  }
})

export const { resetStatus } = authenticationSlice.actions

export default authenticationSlice.reducer

export const selectUser = (state) => state.authentication.user;
export const selectLoading = (state) => state.authentication.loading;
export const selectError = (state) => state.authentication.error;
export const selectStatus = (state) => state.authentication.status;