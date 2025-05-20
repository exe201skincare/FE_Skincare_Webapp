import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./Context";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <AppRoutes />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ThemeProvider><HomePage /></ThemeProvider>} />
      <Route />
    </Routes>
  );
}

export default App;
