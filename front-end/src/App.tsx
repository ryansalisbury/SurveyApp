// import React from "react";
// import "./App.css";
// import { Button, ListItemButton } from "@mui/material";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Typography from "@mui/material/Typography";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // Adjust the import path based on your file structure

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more Route components here for additional pages */}
      </Routes>
    </Router>
  );
}

export default App;

// <div className="App">
//   <header className="App-header">
//     <h1>Welcome to my Survey Application</h1>
//     <div>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => alert("Questionnaire 1 Selected")}
//       >
//         Questionnaire 1
//       </Button>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => alert("Questionnaire 2 Selected")}
//       >
//         Questionnaire 2
//       </Button>
//       <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
//         Questionnaire Selection
//       </Typography>
//       <Box
//         sx={{
//           bgcolor: 'background.paper',
//           width: '100%',
//           maxWidth: 360,
//           margin: 'auto',
//           boxShadow: 3,
//         }}
//       >
//         <List dense={true}>
//           <ListItemButton>QuestionnaireName 1</ListItemButton>
//           <ListItemButton>QuestionnaireName 2</ListItemButton>
//           <ListItemButton>QuestionnaireName 3</ListItemButton>
//           <ListItemButton>QuestionnaireName 4</ListItemButton>
//         </List>
//       </Box>
//     </div>
//   </header>
// </div>
