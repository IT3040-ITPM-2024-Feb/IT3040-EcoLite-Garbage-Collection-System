import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  return (
      <Menu
        theme="light"
        mode="vertical"
        defaultSelectedKeys={["0"]}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(179, 179, 179) 0px 0px 0px 1px",
          borderRadius : "15px",
          height: "500px",
          width: "250px",
          padding: "10px", 
          position: "fixed",
          left: 10,
          top: 100,
          bottom: 0,
          borderRight: 0
        }}
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>
              {item.icon && <item.icon style={{ fontSize: "1.5em", color: "#7a7d7b" }} />}
              <span style={{ marginLeft: "1em" }}>{item.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
  );
};

export default SideMenu;
