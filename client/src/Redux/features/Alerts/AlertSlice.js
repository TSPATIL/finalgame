import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: "",
    type: "",
}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        clearAlert: (state)=>{
            state.message = ""
            state.type = ""
        },
    }
});

export const {showAlert, clearAlert} = alertSlice.actions;
export default alertSlice.reducer;

export const selectAlertMessage = (state)=> state.alert.message;
export const selectAlertType = (state)=> state.alert.type;