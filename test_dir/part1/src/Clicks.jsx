import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>

    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{text}</button>

const Clicks = () => {
    const [clicks, setClicks] = useState({left: 0, right: 0})
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
      setAll(allClicks.concat('L'))
      const newClicks = {...clicks, left: clicks.left + 1}
      setClicks(newClicks)
      setTotal(newClicks.left + newClicks.right)
    }

    const handleRightClick = () => {
      setAll(allClicks.concat('R'))
      const newClicks = {...clicks, right: clicks.right + 1}
      setClicks(newClicks)
      setTotal(newClicks.left + newClicks.right)
    }
  
    return (
      <div>
        {clicks.left}
        <Button handleClick={handleLeftClick} text="Left" />
        <Button handleClick={handleRightClick} text="right" />
        {clicks.right}
        <History allClicks={allClicks} />
      </div>
    )
  }
  
  export default Clicks