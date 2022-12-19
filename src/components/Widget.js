import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import TimerComponent from "./Timer";

const Widget = ({
  resetTimer = false,
  triggerApi = () => {},
  deviceData = {},
}) => {
  const deviceName = deviceData.device_name;
  const sensorData = deviceData.sensor_values;

  const formatCurrentDate = () => {
    const today = new Date();
    return `${today.toLocaleDateString()} ${today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const displayCurrentDate = formatCurrentDate();

  return (
    <Grid item lg={6}>
      <Box
        sx={{
          padding: "5px 10px",
          backgroundColor: "#E5E4E2",
        }}
      >
        <Typography variant="body2">Most Recent Values</Typography>
        <Typography variant="body2">{deviceName}</Typography>
      </Box>

      <Stack sx={{ border: "1px solid #808085", padding: "5px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2vh 0",
          }}
        >
          <Typography variant="caption">{displayCurrentDate}</Typography>
          <TimerComponent resetTimer={resetTimer} triggerApi={triggerApi} />
        </Box>
        {sensorData &&
          sensorData.map((data, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #808080",
              }}
            >
              <Typography variant="subtitle2">{data.label}</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography fontWeight={700}>{data.value}</Typography>
                <Typography fontWeight={700}>{data.unit}</Typography>
                <KeyboardArrowDownIcon fontSize="small" />
              </Stack>
            </Box>
          ))}
      </Stack>
    </Grid>
  );
};

export default Widget;
