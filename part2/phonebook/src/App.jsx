import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'
import styles from './styles'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [notifStyle, setNotifStyle] = useState({...styles.defaultNotifStyle})

  useEffect(() => {
    personServices.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const pIdx = persons.map(p => p.name).indexOf(newName)

    if (pIdx >= 0) {
      const person = persons[pIdx]
      const changedPerson = { ...person, number: newNumber }

      const message = `${changedPerson.name} is already added to phonebook, replace the old number with a new one?`

      if (window.confirm(message)) {
        personServices.update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
       })
        return
      }
      
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personServices.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`)
        setNotifStyle({...styles.notifSuccessStyle})
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const errorMsg = error.response.data.error
        setMessage(errorMsg)
        setNotifStyle({...styles.notifFailedStyle})
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices.del(person.id)
        .then(data => {
          console.log(data)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          const message = `Information of ${person.name} has already been removed from server`
          setMessage(message)
          setNotifStyle({ ...styles.notifFailedStyle })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    else {
      console.log("Cancelled deletion")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.indexOf(filter) >= 0)
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} notifStyle={notifStyle} />
      <Filter onChange={handleFilterChange} filter={filter} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App