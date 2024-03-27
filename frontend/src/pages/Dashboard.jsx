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
import Home from "./Home/Home";
import HeaderComponent from "../partials/Header";
import Footer from "../partials/Footer";

const { Sider, Content } = Layout;

const Dashboard = () => {
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
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Dashboard;
