import { useState } from "react"
import axios from "axios"
//import 'dotenv/config'

const Country = ({ changeShow, showState, country }) => {

    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [imageURL, setImageURL] = useState('') 
    const Ikey = import.meta.env.VITE_WEATHER_KEY

    if (!showState)
        return (
            <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => {
                    //showState = true
                    changeShow(country.name.common)
                }}>show</button>
            </div>
    )
    
    const capital = country.capital
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${Ikey}`

    axios.get(baseURL)
    .then(response => {
        const data = response.data
        setTemperature(data.main.temp)
        setWind(data.wind.speed)
        const imageTag = data.weather[0].icon
        const imageURL = `https://openweathermap.org/img/wn/${imageTag}@2x.png`
        setImageURL(imageURL)
    })


    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <h3>languages:</h3>
            <ul>
                { Object.values(country.languages).map(language => 
                    <li key={language}>{language}</li>) 
                }
            </ul>
            <img
                src={country.flags.png}
                alt={country.flags.alt}
            />
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {temperature} Celcius</p>
            <img
                src={imageURL}
            />
            <p>wind {wind} m/s</p>
        </div> 
    )
}

export default Country