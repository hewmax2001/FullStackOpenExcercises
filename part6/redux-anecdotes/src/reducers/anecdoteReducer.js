import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      return state.concat(action.payload)
    },
    updateAnecdote(state, action) {
      const updateAnecdote = action.payload
      return state.map( a => 
          a.id === updateAnecdote.id ? updateAnecdote : a
        )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async (dispatch, getState) => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdotes, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer