import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key | undefined,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const SidebarItem = (): MenuItem[] => {
  return [
    getItem(
      "Thông tin hệ thống",
      "dashboard",
      <FontAwesomeIcon icon={solid("infinity")} />
    ),
    { type: "divider" },
    getItem(
      "Chung",
      "common",
      null,
      [
        getItem(
          "Quản lý người dùng",
          "user-management",
          <FontAwesomeIcon icon={solid("user-group")} />,
          [
            getItem(
              "Quản lý khách hàng",
              undefined,
              undefined,
              [
                getItem(
                  "Tài khoản khách hàng",
                  "customer-account",
                  <FontAwesomeIcon icon={solid("file-invoice")} />,
                  undefined,
                  undefined
                ),
                getItem(
                  "Khách hàng thân thiết",
                  "customer-familiar",
                  <FontAwesomeIcon icon={solid("heart")} />,
                  undefined,
                  undefined
                ),
              ],
              "group"
            ),
            getItem(
              "Quản lý quản trị viên",
              undefined,
              undefined,
              [
                getItem(
                  "Tài khoản quản trị viên",
                  "admin-account",
                  <FontAwesomeIcon icon={solid("user-shield")} />
                ),
              ],
              "group"
            ),
          ]
        ),
        getItem(
          "Quản lý đơn hàng",
          "order-management",
          <FontAwesomeIcon icon={solid("money-bill")} />
        ),
        getItem(
          "Quản lý sản phẩm",
          "product-management",
          <FontAwesomeIcon icon={solid("hat-cowboy-side")} />
        ),
        getItem(
          "Quản lý danh mục",
          "category-management",
          <FontAwesomeIcon icon={solid("list-ul")} />
        ),
        getItem(
          "Quản lý kho",
          "warehouse-management",
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
          "change-language",
          <FontAwesomeIcon icon={solid("earth-americas")} />
        ),
        getItem(
          "Cơ sở dữ liệu",
          "access-database",
          <FontAwesomeIcon icon={solid("database")} />,
          undefined,
          undefined
        ),
      ],
      "group"
    ),
  ];
};

export default SidebarItem;
