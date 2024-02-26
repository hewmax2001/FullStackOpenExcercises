const Notification = ({ message, notifStyle }) => {
    if (message === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}

export default Notification