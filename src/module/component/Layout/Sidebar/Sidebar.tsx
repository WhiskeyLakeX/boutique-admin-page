import React from "react";
import SidebarItem from "./SidebarItem";
import { handleConvertArrToPath } from "../../../utils/ConvertArrToPath";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import UserAction from "../../../../redux/actions/UserAction";
import { handleSuccess } from "../../../utils/Notification";
import { PATHNAME } from "../../../../config";
import { useDispatch } from "react-redux";

interface ISidebar {
  getListOfBreadcrumbItem: (params: string[]) => void;
}

const Sidebar = ({ getListOfBreadcrumbItem }: ISidebar) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(UserAction.userLogout());
    handleSuccess("logout");
    setTimeout(() => {
      window.location.href = PATHNAME.LOGIN;
    }, 500);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={SidebarItem()}
      onSelect={({ item, key, keyPath }) => {
        if (key === "logout") {
          handleLogout();
          return;
        }
        getListOfBreadcrumbItem(keyPath);
        navigator(handleConvertArrToPath(keyPath));
      }}
      triggerSubMenuAction={"hover"}
      style={{
        overflowY: "auto",
      }}
    />
  );
};

export default Sidebar;
