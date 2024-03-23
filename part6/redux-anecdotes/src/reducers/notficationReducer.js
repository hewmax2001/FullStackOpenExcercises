import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notifChange(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(notifChange(message))
        setTimeout(() => {
            dispatch(notifChange(null))
        }, seconds * 1000)
    }
}

export const { notifChange } = notificationSlice.actions
export default notificationSlice.reducer