import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SellerRegister from "./pages/SellerRegister";
import BuyerRegister from "./pages/BuyerRegister";

function App() {
  // const isLogged = window.localStorage.getItem("LoggedIn"); //Uncomment this after implementing login functionality
  const isLogged = true;

  return (
    <>
      <Routes>
        {isLogged ? (
          <>
            <Route path="*" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/buyer-register" element={<BuyerRegister />} />
      </Routes>
    </>
  );
}

export default App;
