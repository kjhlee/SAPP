import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client"
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SchedulePage from './pages/SchedulePage';
import Login from './pages/Login';
import ScheduleList from './pages/ScheduleList';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path ="/ScheduleList" 
        element={
        <ProtectedRoute>
          <ScheduleList />
        </ProtectedRoute>
        } />

      <Route 
        path="/schedules/:id" 
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        } />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element = {<Register />} />
    </Routes>
  </Router>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
export default App;

