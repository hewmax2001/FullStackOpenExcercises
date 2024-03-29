import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
        style: null,
    },
    reducers: {
        changeMessage(state, action) {
            return {...state, message: action.payload}
        },
        changeStyle(state, action) {
            return {...state, style: action.payload}
        }
    }
})

export const displayNotification = (message, style, seconds) => {
    return async dispatch => {
        dispatch(changeMessage(message))
        dispatch(changeStyle(style))
        setTimeout(() => {
            dispatch(changeMessage(null))
        }, seconds * 1000)
    }
}

export const { changeMessage, changeStyle } = notificationSlice.actions
export default notificationSlice.reducer