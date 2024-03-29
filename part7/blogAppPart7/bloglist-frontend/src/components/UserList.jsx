import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper } from "@mui/material"

const UserList = () => {
    const users = useSelector(state => state.users)
    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell>Blogs Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserList