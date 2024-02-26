const defaultNotifStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notifSuccessStyle = {
    ...defaultNotifStyle, color: 'green'
  }

  const notifFailedStyle = {
    defaultNotifStyle, color: 'red'
  }

  export default { defaultNotifStyle, notifSuccessStyle, notifFailedStyle }