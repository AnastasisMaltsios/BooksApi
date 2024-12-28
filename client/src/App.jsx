import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./Components/Login";
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Main from "./Components/Main";
import ProtectedRoute from "./Components/Protected";

function App() {
  return(
    <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<ProtectedRoute>
                  <Main />
                </ProtectedRoute>} />
            </Routes>
        </Router>
  ); 
}
export default App
