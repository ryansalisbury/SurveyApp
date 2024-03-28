import React from "react";
import "./css/HomePage.css";
import { Button, ListItemButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import path from "path";
import { useNavigate } from "react-router-dom";
import QuestionnaireList from "../questionnaireList/questionnaireList";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the questionnaire example page
    navigate("/questionnaire/create");
  };
  const userId = localStorage.getItem("userId");
  return (
    <header className="App-header">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
        Ryan Salisbury, Survey Application
      </Typography>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
          Questionnaire Selection
        </Typography>

        <Stack
          direction="column"
          spacing={2} // Adjust spacing as needed
          alignItems="center" // Center align the children
          sx={{ maxWidth: 360, mx: "auto" }} // 'mx' is shorthand for margin left & right
        >
          <Box
            sx={{
              bgcolor: "grey.900",
              width: "100%", // Make the Box take the full width of the Stack
              boxShadow: 3,
              borderRadius: "16px",
            }}
          >
            <QuestionnaireList />
          </Box>
          <Button variant="contained" color="primary" onClick={handleNavigate}>
            Create Questionnaire
          </Button>
        </Stack>
      </div>
    </header>
  );
};

export default HomePage;
