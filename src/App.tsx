import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ClockInPage from "./pages/ClockInPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/clockin" element={<ClockInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
