import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { displayNotification } from "../reducers/notificationReducer";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Replace useState instances with event.target.field_name.value?
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(username, password))
      setUsername("");
      setPassword("");
      navigate("/")
    } catch {
      dispatch(displayNotification('Wrong credentials', 'error', 5))
    }
  };

  return (
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
  );
};

export default LoginForm;
