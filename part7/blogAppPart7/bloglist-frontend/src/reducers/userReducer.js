import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const loginUser = (username, password) => {
    return async dispatch => {
        const response = await loginServices.login(username, password)
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(response));
        blogService.setToken(response.token);
        dispatch(setUser(response))
    }
}

export const logoutUser = () => {
    return dispatch => {
        window.localStorage.removeItem("loggedBlogUser");
        dispatch(setUser(null))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer