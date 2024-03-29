import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { displayNotification } from "../reducers/notificationReducer";

const LoginForm = (props) => {
  const dispatch = useDispatch()

  // Replace useState instances with event.target.field_name.value?
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(username, password))
      setUsername("");
      setPassword("");
    } catch {
      dispatch(displayNotification('Wrong credentials', 'notifFailed', 5))
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
