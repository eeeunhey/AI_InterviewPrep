import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auto/Login";
import SignUp from "./pages/Auth/SignUp";
import LandingPage from "./pages/LandingPage";
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";


const App = () => {
    return (
      <div>
          <Router>
            <Routes>
              {/* Default Route */}
            </Routes>
          </Router>

      </div>

    )
}

export default App