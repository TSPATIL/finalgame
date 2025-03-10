import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addContact, deleteContact, getContactDetails, getAllContacts } from "./ContactAPIFunc";

const initialState = {
    loading: false,
    contacts: null,
    error: null
}

export const addContactAsync = createAsyncThunk(
    "contact/addContact",
    async (contactDetails, { rejectWithValue }) => {
        try {
            const response = await addContact(contactDetails);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getAllContactsAsync = createAsyncThunk(
    "contact/getAllContacts",
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
export const deleteContactAsync = createAsyncThunk(
    "contact/deleteContact",
    async (contactId, { rejectWithValue }) => {
        try {
            const response = await deleteContact(contactId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const getContactDetailsAsync = createAsyncThunk(
    "contact/getContactDetails",
    async (contactId, { rejectWithValue }) => {
        try {
            const response = await getContactDetails(contactId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        clearContacts: (state) => {
            state.contacts = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addContactAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addContactAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(addContactAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getAllContactsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllContactsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(getAllContactsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteContactAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteContactAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(deleteContactAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getContactDetailsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(getContactDetailsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
});

export const {clearContacts} = contactSlice.actions;
export default contactSlice.reducer;

export const selectLoading = (state)=> state.contact.loading;
export const selectError = (state)=> state.contact.error;
export const selectContacts = (state)=> state.contact.contacts;