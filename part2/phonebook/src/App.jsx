import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices.del(person.id)
        .then(data => {
          console.log(data)
          setPersons(persons.filter(p => p.id !== person.id))
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
      <Filter onChange={handleFilterChange} filter={filter} />
      <h3>add a new</h3>
      <div>debug: {newName}</div>
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