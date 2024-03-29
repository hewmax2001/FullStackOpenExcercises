import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

const User = (props) => {
    const allUsers = useSelector(state => state.users)
    const match = useMatch('users/:id')
    const user = match ?
        allUsers.find(u => u.id === match.params.id) :
        null
    
    if (!user) 
        return null

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User