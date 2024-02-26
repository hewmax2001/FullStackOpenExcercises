import { useState, useEffect } from 'react'
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

   

    useEffect(() => {
      noteService.getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
      }, [])

    console.log('render', notes.length, 'notes');
    
    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      }

      //setNotes(notes.concat(noteObject))
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }

    const toggleImportance = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important}

      noteService.update(id, changedNote).then(returnedNote => {
        // Perform a function of every note object in the notes array
        // The functions performs a conditional operation on the id to see if it matches
        // out note's id.
        // If so, replace with the response from the put request.
        // Else, just set the index to the same note object, keeping it the same
        // As a result of state change, the component is re-rendered
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    }

    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>
        <ul>
            {notesToShow.map(note => 
                <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
            )}
        </ul>
        <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>
        <Footer />
      </div>
    )
  }
  
  export default App