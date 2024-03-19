import React from "react";
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  DownOutlined,
  HomeOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const { Header } = Layout;

const HeaderComponent = () => {
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("LoggedIn");
    window.location.href = "/login";
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={handleSignOut} to="/signout">
          Sign out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: "#f5f5f5",
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div style={{ marginTop: "15px" }}>
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
            width="50px"
            alt="logo"
          />
        </a>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        className="custom-header"
        defaultSelectedKeys={["home"]}
        style={{
          lineHeight: "64px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/">HOME</Link>
        </Menu.Item>
        <Menu.Item
          key="shop"
          icon={<ShopOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/shop">SHOP</Link>
        </Menu.Item>
        <Menu.Item
          key="about"
          icon={<QuestionCircleOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/about">ABOUT</Link>
        </Menu.Item>
        <Menu.Item
          key="buyers"
          icon={<UserSwitchOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/buyers">BUYERS</Link>
        </Menu.Item>

        <Menu.Item
          key="contact"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/contact">CONTACT</Link>
        </Menu.Item>
      </Menu>
      <div style={{ float: "right" }}>
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Button
            shape="circle"
            style={{
              border: "none",
              width: "80px",
              height: "50px",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Avatar icon={<UserOutlined />} />
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
