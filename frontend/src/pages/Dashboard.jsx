import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import SideMenu from "../partials/SideMenu";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SellerDashboard from "./Seller/SellerDashboard";
import HeaderComponent from "../partials/Header";
import Footer from "../partials/Footer";
import AdminDashborad from "../pages/Admin/AdminDashboard";
import CompanyDashborad from "../pages/Company/companyDashboard";
import Earnings from "../pages/Payments/Earnings";
import Calender from "../pages/Others/Calender";
import SellerProfile from "../pages/Seller/SellerProfile";
import CompanyProfile from "../pages/Company/CompanyProfile";
import AdminProfile from "../pages/Admin/AdminProfile";
import Settings from "../pages/Settings/Settings";
import ErrorPageTest from "../pages/ErrorPages/ErrorPageTest";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const role = window.localStorage.getItem("role");

  // Populate this array with the navigation links
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: HomeOutlined,
    },
    {
      label: "Earnings",
      path: "/earnings",
      icon: DollarOutlined,
    },
    {
      label: "Calender",
      path: "/calender",
      icon: CalendarOutlined,
    },
    {
      label: "Your Details",
      path: "/yourDetails",
      icon: UserOutlined,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: SettingOutlined,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout style={{ padding: "15px 24px 24px" }}>
        <Sider width={265} style={{ backgroundColor: "#f5f5f5" }}>
          <SideMenu menuItems={menuItems} />
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {role == "admin" ? (
              <Route path="/dashboard" element={<AdminDashborad />} />
            ) : role == "company" ? (
              <Route path="/dashboard" element={<CompanyDashborad />} />
            ) : role == "seller" ? (
              <Route path="/dashboard" element={<SellerDashboard />} />
            ) : (
              <Navigate to="/login" />
            )}

            <Route path="/earnings" element={<Earnings />} />
            <Route path="/calender" element={<Calender />} />

            {role == "admin" ? (
              <Route path="/yourDetails" element={<AdminProfile />} />
            ) : role == "company" ? (
              <Route path="/yourDetails" element={<CompanyProfile />} />
            ) : role == "seller" ? (
              <Route path="/yourDetails" element={<SellerProfile />} />
            ) : (
              <Route path="/yourDetails" element={<ErrorPageTest />} />
            )}

            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Dashboard;
