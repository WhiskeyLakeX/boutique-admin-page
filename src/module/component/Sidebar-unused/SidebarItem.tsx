import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  onTitleClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onTitleClick,
  } as MenuItem;
}
const SidebarItem: MenuProps["items"] = [
  getItem("Quản lý người dùng", "menu-1", <MailOutlined />, [
    getItem(
      "Quản lý khách hàng",
      "user",
      null,
      [
        getItem("Tài khoản khách hàng", "menu-user-1"),
        getItem("Khách hàng thân thiết", "menu-user-2"),
      ],
      "group"
    ),
    getItem(
      "Quản lý quản trị viên",
      "admin",
      null,
      [getItem("Tài khoản quản trị viên", "menu-admin-1")],
      "group"
    ),
  ]),

  { type: "divider" },
  getItem("Quản lý sản phẩm", "menu-2", <AppstoreOutlined />),

  { type: "divider" },

  getItem("Quản lý kho", "menu-3", <SettingOutlined />),

  getItem(
    "Khác",
    "other",
    null,
    [
      getItem("Đổi ngôn ngữ", "other-change-language"),
      getItem(
        "Cơ sở dữ liệu",
        "other-database",
        undefined,
        undefined,
        undefined,
        () => {
          alert("Void");
        }
      ),
    ],
    "group"
  ),
];
export default SidebarItem!;
