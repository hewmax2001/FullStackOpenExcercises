import { useState } from 'react'

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={((good * 1) + (bad * -1)) / total} />
          <StatisticsLine text="positive" value={(good / total) * 100 + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({text, value}) =>
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>

const Button = ({handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    setGood(newGood)
    setTotal(newTotal)
  }
  
  const increaseNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(newNeutral)
    setTotal(newTotal)
  }

  const increaseBad = () =>{
    const newBad = bad + 1
    const newTotal = total + 1;
    setBad(newBad)
    setTotal(newTotal)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text={"good"} />
      <Button handleClick={increaseNeutral} text={"neutral"} />
      <Button handleClick={increaseBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

      
    </div>
  )
}

export default App