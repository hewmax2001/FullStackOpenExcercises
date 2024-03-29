import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users"

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const initializeUsers = () => {
    return async dispatch => {
        const usersResposne = await usersService.getAll()
        dispatch(setUsers(usersResposne))
    }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer