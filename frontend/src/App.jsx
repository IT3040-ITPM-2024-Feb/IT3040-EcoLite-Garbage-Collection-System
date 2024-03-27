import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import SellerRegister from "./pages/SellerRegister";
import BuyerRegister from "./pages/BuyerRegister";
import AllCompany from "./pages/Company/CompanyAll/AllCompany";
import AdminDashborad from "./pages/Admin/AdminDashboard";
import CompanyDashborad from "./pages/Company/companyDashboard";

function App() {
  const isLogged = window.localStorage.getItem("LoggedIn");

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
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/buyer-register" element={<BuyerRegister />} />
      </Routes>
    </>
  );

  // return (
  //   <>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={
  //           isLogged ? (
  //             userRole === "admin" ? (
  //               <Navigate to="/adminDashboard" />
  //             ) : userRole === "seller" ? (
  //               <Navigate to="/dashboard" />
  //             ) : userRole === "company" ? (
  //               <Navigate to="/companyDashboard" />
  //             ) : (
  //               <Navigate to="/login" />
  //             )
  //           ) : (
  //             <Navigate to="/login" />
  //           )
  //         }
  //       />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/adminDashboard" element={<AdminDashborad />} />
  //       <Route path="/companyDashboard" element={<CompanyDashborad />} />
  //       <Route path="/seller-register" element={<SellerRegister />} />
  //       <Route path="/buyer-register" element={<BuyerRegister />} />
  //     </Routes>
  //   </>
  // );
}

export default App;
