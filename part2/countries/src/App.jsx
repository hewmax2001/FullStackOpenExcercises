import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [matchedCountries, setMatchedCountries] = useState([])
  const [countries, setCountries] = useState([])

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        //console.log(response.data)
        const countriesList = response.data
        setCountries(countriesList)
      })
  }, [])

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    changeSearch(searchTerm)
  }

  const changeSearch = searchTerm => {
    const matched = countries.filter(country => country.name.common.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
    //console.log(matched)
    setSearchTerm(searchTerm)
    setMatchedCountries(matched)
  }


  return (
    <div>
      <p>find countries</p>
      <input value={searchTerm} onChange={handleSearch}/>
      <CountryList matchedCountries={matchedCountries} changeSearch={changeSearch} />
    </div>
  )
}

export default App