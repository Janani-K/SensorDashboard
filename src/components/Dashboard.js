import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Widget from "./Widget";

const Dashboard = () => {
  const [makeApi, updateApiTrigger] = React.useState(false);
  const [allSensorData, updateSensorData] = React.useState([]);

  const callApi = React.useCallback(async (initialLoad = false) => {
    // call api
    try {
      let URL = "http://localhost:5000/sensor_data";
      const { data } = await axios.get(URL);

      updateSensorData(data);
      if (!initialLoad) {
        updateApiTrigger(!makeApi);
      }
    } catch (e) {
      alert("API Failed");
    }
  }, [makeApi]);

  React.useEffect(() => {
    const getInitialData = async () => {
      await callApi(true);
    };
    getInitialData();
  }, [callApi]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", padding: "0px 10vw" }}
      >
        <Grid item lg={12} xs={12}>
          <Typography variant="h4" align="center">
            Sensor Dashboard
          </Typography>
        </Grid>
        {allSensorData &&
          allSensorData.map((data, index) => (
            <Widget
              key={index}
              deviceData={data}
              resetTimer={makeApi}
              triggerApi={callApi}
            />
          ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
