import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  // You would only use a togglable display state if you wished to retain the state of the component?
  // For instance a login form ought to remove all details thus only render on a condition
  // NOT have it's display style changed?
  const [visible, setVisible] = useState(false)

  const toggledOn = { display: visible ? '' : 'none' }
  const toggledOff = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={toggledOff}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={toggledOn}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable