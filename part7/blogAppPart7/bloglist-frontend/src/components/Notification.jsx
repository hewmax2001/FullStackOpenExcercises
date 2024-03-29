import { useSelector } from "react-redux";

const Notification = (props) => {
  const { message, style } = useSelector(state => state.notification)

  if (message === null) {
    return null;
  }

  return (
    <div className={["defaultNotif", style].join(" ")}>{message}</div>
  );
};

export default Notification;
