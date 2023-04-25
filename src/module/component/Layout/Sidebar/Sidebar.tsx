import React, { memo } from "react";
import SidebarItem from "./SidebarItem";
import { Menu } from "antd";

interface ISidebar {
  // getListOfBreadcrumbItem: (params: string[]) => void;
  handleRouterChange: ({ item, key, keyPath }: any) => void;
}

const Sidebar = ({ handleRouterChange }: ISidebar) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={SidebarItem()}
      onSelect={({ item, key, keyPath }) =>
        handleRouterChange({ item, key, keyPath })
      }
      triggerSubMenuAction={"hover"}
      style={{
        overflowY: "auto",
      }}
    />
  );
};

export default memo(Sidebar);
