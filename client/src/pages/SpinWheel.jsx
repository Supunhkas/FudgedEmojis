import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopNavBar from "../components/TopNavBar";
import WheelComponent from "../components/WheelComponent";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, overflow: "hidden" }}>{children}</Box>
      )}
    </div>
  );
}

function SimpleTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [value, setValue] = useState(0);
  const [chances, setChances] = useState("1");
  const segments = ["70%", "75%", "80%", "85%", "90%", "95%"];
  const segments2 = ["75%", "80%", "85%", "90%", "95%", "100%"];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    setChances("0");
    saveResultToDatabase(winner, "Amazon");
   
  };
  const onFinished2 = (winner) => {
    setChances("0");
    saveResultToDatabase(winner, "Shopify");
    
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const saveResultToDatabase = (result, selectedTab) => {
    const parsedResult = parseInt(result, 10);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      spinnerResult: parsedResult,
      voucherType: selectedTab,
    };

    axios
      .put(`${baseUrl}/request/addresult/${id}`, data, config)
      .then((response) => {
       
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving result:", error);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TopNavBar />
      <Typography variant="h6" color={"primary"} textAlign={"center"}>
        Chances Available {chances}
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Amazone" />
        <Tab label="Shopify" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={true}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WheelComponent
          segments={segments2}
          segColors={segColors}
          onFinished={(winner) => onFinished2(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={true}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      </TabPanel>
    </>
  );
}

export default SimpleTabs;
