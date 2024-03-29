import { createSelector, createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            return state.concat(action.payload)
        },
        updateBlog(state, action) {
            const blogToUpdate = action.payload
            return state.map( blog => blog.id === blogToUpdate.id ? blogToUpdate : blog)
        },
        setBlogs(state, action) {
            return action.payload
        },
        removeBlog(state, action) {
            const blogToRemove = action.payload
            return state.filter( blog => blog.id === blogToRemove.id ? null : blog)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog, user) => {
    return async dispatch => {
        // need to append user as response does not contain user
        const newBlog = {...await blogService.createBlog(blog), user}
        dispatch(appendBlogs(newBlog))
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const likedBlog = await blogService.likeBlog(blog)
        dispatch(updateBlog(likedBlog))
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.removeBlog(blog)
        dispatch(removeBlog(blog))
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        const response = await blogService.commentBlog(blog, comment)
        dispatch(updateBlog(response))
    }
}

// Some unworking solution to fix warning regarding a selector returning a new reference
// New reference arises from the "setBlogs" & "initialiseBlogs" functions are called
// Reference to response array from the HTTP get request for all blogs
const routine = state => state.blogs

export const getOrderedBlogs = createSelector([routine], uBlogs => {
    console.log('What is this?', uBlogs)
    if (!uBlogs) return []
    return uBlogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
})

// Is it correct to export the reducer actions? Instead of just the action creators
export const { appendBlogs, updateBlog, setBlogs, removeBlog } = blogSlice.actions
export default blogSlice.reducer