import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './App.css';
import Test from './pages/test/test';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedules/:id" element={<SchedulePage />} />
    </Routes>
  </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
export default App;

