const Notification = ({ message, notifStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={['defaultNotif', notifStyle].join(' ')}>
      {message}
    </div>
  )
}

export default Notification