import { useState } from 'react'
import loginServices from '../services/login'
import Notification from './Notification'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUserDetails }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginServices.login(username, password)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(response)
      )
      blogService.setToken(response.token)
      setUserDetails(response)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      { errorMessage !== null && <Notification message={errorMessage} notifStyle={'notifFailed'} /> }
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            type="text"
            data-testid='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
                    password
          <input
            type="password"
            data-testid='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  setUserDetails: PropTypes.func.isRequired
}

export default LoginForm