const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <div>
            { personsToShow.length <= 0 ? '...' : personsToShow.map(person => 
                <div key={person.id}>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => handleDelete(person)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons