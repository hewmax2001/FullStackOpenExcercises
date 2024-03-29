import { logoutUser } from "../reducers/userReducer";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Button } from "@mui/material";

const Menu = (props) => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.user)
    const links = [
        { link: '/users', name: 'users'},
        { link: '/', name: 'blogs'}
    ]

    const linkStyle = {
        paddingRight: 4
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {links.map((l) => (
                    <Button key={l.name} color="inherit" component={Link} to={l.link}>{l.name}</Button>
                ))}
                { userDetails ? (
                <div>
                    <b>{`${userDetails.name} logged in`}</b>
                    <Button color="inherit" onClick={() => dispatch(logoutUser())}>logout</Button>
                </div>
                )
                :
                (
                <Button color="inherit" component={Link} to={"/login"}>login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Menu