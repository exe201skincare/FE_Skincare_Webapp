import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./Context";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage/AboutPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <AppRoutes />
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <ThemeProvider>
            <Navbar selected={"home"}/>
            <HomePage />
            <Footer />
          </ThemeProvider>} />
          
        <Route path="/about_us" element={
          <ThemeProvider>
            <Navbar selected={"about"}/>
            <AboutPage />
            <Footer />
          </ThemeProvider>
        } />
        
      </Routes>
    </>
  );
}

export default App;
