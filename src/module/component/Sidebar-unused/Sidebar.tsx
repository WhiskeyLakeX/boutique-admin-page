import React, { useState } from "react";
import { Menu, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SidebarItem from "./SidebarItem";

const Sidebar = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsed = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ maxWidth: 256, paddingLeft: 5 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={isOpen}
        items={SidebarItem}
        style={{
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default Sidebar;
