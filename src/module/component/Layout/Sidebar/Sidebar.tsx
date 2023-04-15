import React from "react";
import SidebarItem from "./SidebarItem";
import { handleConvertArrToPath } from "../../../utils/ConvertArrToPath";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigator = useNavigate();
  // console.log("Sidebar rerender");
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={SidebarItem()}
      onSelect={({ item, key, keyPath }) => {
        navigator(handleConvertArrToPath(keyPath));
      }}
    />
  );
};

export default Sidebar;
