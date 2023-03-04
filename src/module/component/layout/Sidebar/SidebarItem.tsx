import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRoutes } from "react-router-dom";

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
  getItem(
    "Chung",
    "common",
    null,
    [
      getItem(
        "Quản lý người dùng",
        "menu-1",
        <FontAwesomeIcon icon={solid("user-group")} />,
        [
          getItem(
            "Quản lý khách hàng",
            "user",
            null,
            [
              getItem(
                "Tài khoản khách hàng",
                "menu-user-1",
                <FontAwesomeIcon icon={solid("file-invoice")} />,
                [],
                undefined,
                () => {
                  alert("kjahdsf");
                }
              ),
              getItem(
                "Khách hàng thân thiết",
                "menu-user-2",
                <FontAwesomeIcon icon={solid("heart")} />
              ),
            ],
            "group"
          ),
          getItem(
            "Quản lý quản trị viên",
            "admin",
            null,
            [
              getItem(
                "Tài khoản quản trị viên",
                "menu-admin-1",
                <FontAwesomeIcon icon={solid("user-shield")} />
              ),
            ],
            "group"
          ),
        ]
      ),
      getItem(
        "Quản lý đơn hàng",
        "menu-2",
        <FontAwesomeIcon icon={solid("money-bill")} />
      ),
      getItem(
        "Quản lý sản phẩm",
        "menu-3",
        <FontAwesomeIcon icon={solid("hat-cowboy-side")} />
      ),

      getItem(
        "Quản lý kho",
        "menu-4",
        <FontAwesomeIcon icon={solid("boxes-packing")} />
      ),
    ],
    "group"
  ),
  { type: "divider" },
  getItem(
    "Khác",
    "other",
    null,
    [
      getItem(
        "Đổi ngôn ngữ",
        "other-change-language",
        <FontAwesomeIcon icon={solid("earth-americas")} />
      ),
      getItem(
        "Cơ sở dữ liệu",
        "other-database",
        <FontAwesomeIcon icon={solid("database")} />,
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
