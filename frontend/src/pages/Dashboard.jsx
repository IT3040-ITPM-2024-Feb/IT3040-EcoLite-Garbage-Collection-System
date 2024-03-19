import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import SideMenu from "../partials/SideMenu";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Home from "./Home/Home";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  
  // Populate this array with the navigation links
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: HomeOutlined,
    },
    {
      label: 'Users',
      path: '/users',
      icon: UserOutlined,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={265} style={{backgroundColor: "#fff"}}>
        <SideMenu menuItems={menuItems} />
      </Sider>
      <Layout style={{ backgroundColor: "#456352", padding: '0 24px 24px' }}>
        <Content
          style={{
            margin: '24px 16px',
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
    </Layout>
  );
};

export default Dashboard;