import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTest, deleteTest, getAllTests, getTestDetails, updateTestDetails } from "./TestsAPIFunc";

const initialState = {
    loading: false,
    test: null,
    challenges: null,
    error: null
}

export const addTestAsync = createAsyncThunk(
    "tests/addTest",
    async (testDetails, { rejectWithValue }) => {
        try {
            const response = await addTest(testDetails);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getAllTestsAsync = createAsyncThunk(
    "tests/getAllTests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllTests();
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getTestDetailsAsync = createAsyncThunk(
    "tests/getTestDetails",
    async (testID, { rejectWithValue }) => {
        try {
            const response = await getTestDetails(testID);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteTestAsync = createAsyncThunk(
    "tests/deleteTest",
    async (testID, { rejectWithValue }) => {
        try {
            const response = await deleteTest(testID);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateTestDetailsAsync = createAsyncThunk(
    "tests/updateTestDetails",
    async ({testID, testType, testDetails}, { rejectWithValue }) => {
        try {
            console.log(testID);
            console.log(testType);
            console.log(testDetails);
            const response = await updateTestDetails(testID, testType, testDetails)
            return response;
        }
        catch(error) {
            return rejectWithValue(error);
        }
    }
)

export const testsSlice = createSlice({
    name: "tests",
    initialState,
    reducers: {
        clearTests: (state) => {
            state.test = null;
            state.challenges = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTestAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(addTestAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(addTestAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getAllTestsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllTestsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(getAllTestsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(updateTestDetailsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTestDetailsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(updateTestDetailsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(deleteTestAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTestAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(deleteTestAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})