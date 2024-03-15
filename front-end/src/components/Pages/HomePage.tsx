import React from "react";
import "./css/HomePage.css";
import { Button, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import path from "path";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the questionnaire example page
    navigate("/questionnaire-1-test");
  };
  return (
    <header className="App-header">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
        Ryan Salisbury, Survey Application
      </Typography>
      <div>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
          Questionnaire Selection
        </Typography>
        <Box
          sx={{
            bgcolor: "grey.900",
            width: "auto",
            maxWidth: 360,
            margin: "auto",
            boxShadow: 3,
            borderRadius: "16px",
          }}
        >
          <List dense={true}>
            <ListItemButton onClick={handleNavigate}>
              <ListItemIcon>
                <PsychologyAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="QuestionnaireName 1"
                sx={{ whiteSpace: "nowrap" }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PsychologyAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="QuestionnaireName 2"
                sx={{ whiteSpace: "nowrap" }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PsychologyAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="QuestionnaireName 3"
                sx={{ whiteSpace: "nowrap" }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PsychologyAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="QuestionnaireName 4"
                sx={{ whiteSpace: "nowrap" }}
              />
            </ListItemButton>
          </List>
        </Box>
      </div>
    </header>
  );
};

export default HomePage;
