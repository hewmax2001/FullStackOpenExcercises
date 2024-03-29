import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = (props) => {
  const { message, style } = useSelector(state => state.notification)

  if (message === null) {
    return null;
  }

  return (
    <div>
      <Alert severity={style}>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
