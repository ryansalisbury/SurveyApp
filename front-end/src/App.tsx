import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage"; // Adjust the import path based on your file structure
import QuestionnairePage from "./components/Pages/Questionnaire";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function

function App() {
  useEffect(() => {
    // This checks if uuijd exists in localstorage
    let userId = localStorage.getItem("userId");

    // if it does not we generate qa new one:
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    console.log("User Id: ", userId);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire-1-test" element={<QuestionnairePage />} />
        <Route path="/questionnaire/:id" element={<QuestionnairePage />} />
        {/* Add more Route components here for additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
