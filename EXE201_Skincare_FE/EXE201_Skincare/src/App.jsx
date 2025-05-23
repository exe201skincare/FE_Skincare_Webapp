import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./Context";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <AppRoutes />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <ThemeProvider>
          <Navbar />
          <HomePage />
          <Footer />
        </ThemeProvider>} />
      <Route />
      <Route path="/about_us" element={<></>}/>
      <Route/>
      
    </Routes>
  );
}

export default App;
