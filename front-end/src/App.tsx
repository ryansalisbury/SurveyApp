import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage"; // Adjust the import path based on your file structure
import QuestionnairePage from "./components/Pages/Questionnaire";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire-1-test" element={<QuestionnairePage />} />
        {/* Add more Route components here for additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
