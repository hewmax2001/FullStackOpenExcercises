import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Routes, Route } from 'react-router-dom'
import BlogList from "./components/BlogList";
import { initializeUsers } from "./reducers/allUsersReducer";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import Menu from "./components/Menu"
import { Container } from '@mui/material'

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
    <Container>
      <Menu />
      <Notification />

      <h1>blog app</h1>

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>

    </Container>
  );
};

export default App;
