import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifChange, setNotification } from '../reducers/notficationReducer'

const AnecdotesList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter( a => a.content.includes(state.filter) ? a : null))
        .sort((a, b) => a.votes > b.votes ? -1 : 1 )
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted ${anecdote.content}`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdotesList