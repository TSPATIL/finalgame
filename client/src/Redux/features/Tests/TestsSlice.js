import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTest, deleteTest, getTestDetails, updateTestDetails } from "./TestsAPIFunc";

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
            const response = await getAllContacts();
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
            const response = await getAllContacts(testID);
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
    async (testID, testDetails, { rejectWithValue }) => {
        try {
            const response = await updateTestDetails(testID, testDetails)
            return response;
        }
        catch {
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
            .addCase(addTestsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(addTestsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(addTestsAsync.rejected, (state, action) => {
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
            .addCase(deleteTestsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTestsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(deleteTestsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(updateTestsDetailsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTestsDetailsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.test = action.payload.test
                state.challenges = action.payload.challenges
            })
            .addCase(updateTestsDetailsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})