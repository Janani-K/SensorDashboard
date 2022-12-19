import { Typography } from "@mui/material";
import React from "react";

const TimerComponent = ({ resetTimer = false, triggerApi = () => {} }) => {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    counter > 0
      ? setTimeout(() => setCounter(counter - 1), 1000)
      : triggerApi();
  }, [counter, triggerApi]);

  React.useEffect(() => {
    setCounter(60);
  }, [resetTimer]);

  return <Typography variant="caption"> next: {counter}</Typography>;
};

export default TimerComponent;
