
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage"; // Adjust the import path based on your file structure

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
