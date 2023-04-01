import React, { ReactNode } from "react";
import Route404 from "../pages/page_404/Route404";
import Login from "../pages/common/login/Login";
import ProductManagement from "../pages/product-management";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IRoute extends Object {
  path: string;
  name: string;
  isSideBar?: boolean | true;
  children?: IRoute[];
  element?: ReactNode;
}

const routes: IRoute[] = [
  {
    path: "/login",
    name: "Login Page",
    element: <Login />,
  },
  {
    path: "*",
    name: "404 Page",
    element: <Route404 />,
  },
  {
    path: "/",
    name: "Trang chủ",
    children: [
      {
        path: "dashboard",
        name: "Bảng điều khiển",
        element: <Route404 />,
      },
      {
        path: "user-management",
        name: "Quản lý người dùng",
        children: [
          {
            name: "Tài khoản khách hàng",
            path: "customer-account",
            isSideBar: true,
            element: <ProductManagement />,
          },
          {
            name: "Khách hàng thân thiết",
            path: "customer-familiar",
            isSideBar: true,
            element: <Route404 />,
          },
          {
            name: "Tài khoản QTV",
            path: "admin-account",
            isSideBar: true,
            element: <Route404 />,
          },
        ],
      },
      {
        path: "product-management",
        name: "Quản lý sản phẩm",
        isSideBar: true,
        element: <Route404 />,
      },
      {
        path: "warehouse-management",
        name: "Quản lý kho",
        isSideBar: true,
        element: <Route404 />,
      },
    ],
  },
];

export default routes;
