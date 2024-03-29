import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import "../styles.css";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";

import { logoutUser, setUser } from "./reducers/userReducer";
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import BlogList from "./components/BlogList";
import { initializeUsers } from "./reducers/allUsersReducer";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";

const Menu = (props) => {
  const userDetails = useSelector(state => state.user)
  const links = [
    { link: '/users', name: 'users'},
    { link: '/', name: 'blogs'}
  ]

  const linkStyle = {
    paddingRight: 4
  }

  return (
    <div className="menu">
      {links.map((l) => (
        <Link key={l.name} style={linkStyle} to={l.link}>{l.name}</Link>
      ))}
      { userDetails && (
        <div>
          {`${userDetails.name} logged in`}
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
        )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  // .sort() returns reference to original array, thus not functional, have to destruct it into a new array
  // const unOrderedBlogs = useSelector(state => state.blogs)
  // const blogs = getOrderedBlogs(unOrderedBlogs)
  
  const userDetails = useSelector(state => state.user)

  // Retrieve all blogs
  // Initialize logged in user if exists
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Menu />
      <Notification />
      {userDetails ? null :
      (
        <Togglable buttonLabel={"Login"}>
          <LoginForm />
        </Togglable>
      )}

      <h1>blog app</h1>

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>

    </div>
  );
};

export default App;
