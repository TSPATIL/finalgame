import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUser, loginUser, googleLoginUser, getAllUsers, getUserDetails, getUserDetailsByParams, logoutUser, updateUserDetails, createAdmin, loginAdmin, logoutAdmin } from './AuthenticationAPIFunc';

const initialState = {
  loading: false,
  user: null,
  error: null,
  status: 'idle',
  isLogin: false
}

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
    const response = await createUser(userData);
    return response.data;
    } catch (error) {
      return rejectWithValue(error); 
    }
  }
)

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try{
    const response = await loginUser(userData);
    return response.data;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const googleLoginUserAsync = createAsyncThunk(
  "user/googleLoginUser",
  async (userData, { rejectWithValue }) => {
    try{
    const response = await googleLoginUser(userData);
    return response.data;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUser",
  async (_, {rejectWithValue}) =>{
    try {
    const response = await logoutUser();
    return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getAllUsersAsync = createAsyncThunk(
  "user/gatAllUsers",
  async (_, { rejectWithValue }) => {
    try{
    const response = await getAllUsers(userData);
    return response.data;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const getUserDetailsAsync = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try{
    const response = await getUserDetails();
    return response;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const getUserDetailsByParamAsync = createAsyncThunk(
  "user/getUserDetailsByParam",
  async (userId, { rejectWithValue }) => {
    try{
    const response = await getUserDetailsByParams(userId);
    console.log(response);
    return response;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const updateUserDetailsAsync = createAsyncThunk(
  "user/updateUserDetails",
  async (userData, {rejectWithValue})=>{
    try{
      const response = await updateUserDetails(userData)
      return response;
    }
    catch{
      return rejectWithValue(error);
    }
  }
)

export const createAdminAsync = createAsyncThunk(
  "user/createAdmin",
  async (adminDetails, { rejectWithValue }) => {
    try {
    const response = await createAdmin(adminDetails);
    return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const loginAdminAsync = createAsyncThunk(
  "user/loginAdmin",
  async (adminDetails, { rejectWithValue }) => {
    try{
    const response = await loginAdmin(adminDetails);
    return response;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
)

export const logoutAdminAsync = createAsyncThunk(
  "user/logoutAdmin",
  async (_, {rejectWithValue}) =>{
    try {
    const response = await logoutAdmin();
    return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
    logout: (state)=>{
      state.isLogin = false
      state.user = null;
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
        state.isLogin = true
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = true
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(googleLoginUserAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(googleLoginUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = true
      })
      .addCase(googleLoginUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = false
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
        state.isLogin = true
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(getUserDetailsAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
      })
      .addCase(getUserDetailsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(getUserDetailsByParamAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(getUserDetailsByParamAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
      })
      .addCase(getUserDetailsByParamAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(updateUserDetailsAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(updateUserDetailsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
      })
      .addCase(updateUserDetailsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(createAdminAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(createAdminAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = true
      })
      .addCase(createAdminAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(loginAdminAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = true
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
      })
      .addCase(logoutAdminAsync.pending, (state) => {
        state.loading = true
        state.status = 'pending'
      })
      .addCase(logoutAdminAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = 'complete'
        state.isLogin = false
      })
      .addCase(logoutAdminAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.status = 'complete'
        state.isLogin = true
      })
  }
})

export const { resetStatus, logout } = authenticationSlice.actions

export default authenticationSlice.reducer

export const selectUser = (state) => state.authentication.user;
export const selectLoading = (state) => state.authentication.loading;
export const selectError = (state) => state.authentication.error;
export const selectStatus = (state) => state.authentication.status;
export const selectIsLogin = (state) => state.authentication.isLogin;