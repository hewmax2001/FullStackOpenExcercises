import Country from './Country'

const CountryList = ({ matchedCountries, changeSearch }) => {

    if (matchedCountries.length === 1) {

        const country = matchedCountries[0]

        return (
            <Country country={country} showState={true} changeShow={changeSearch}/>
        )
    }

    return (
        <div>
            { matchedCountries.length >= 10 ? 'Too many matches, specify another filter'
            : matchedCountries.map(country => 
            <Country key={country.name.common} country={country} showState={false} changeShow={changeSearch} />)
            }
        </div>
    )
}

export default CountryList