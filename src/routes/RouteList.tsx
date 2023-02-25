import React, { ReactNode } from "react";
import Route404 from "../pages/page_404/Route404";
import Login from "../pages/common/login/Login";

export interface IRoute {
  path: string;
  name: string;
  isSideBar: boolean;
  isAvailable?: boolean;
  children?: IRoute[];
  element?: ReactNode;
}

const routes: IRoute[] = [
  {
    path: "/404",
    name: "404 Page",
    isSideBar: false,
    isAvailable: true,
    element: <Route404 />,
  },
  {
    path: "/login",
    name: "Đăng nhập",
    isSideBar: false,
    isAvailable: true,
    element: <Login />,
  },
  {
    path: "/dashboard",
    name: "Bảng điều khiển",
    isSideBar: false,
    isAvailable: true,
    element: <Login />,
  },
  {
    path: "/user-management",
    name: "Quản lý người dùng",
    isSideBar: false,
    isAvailable: true,
    element: <Route404 />,
  },
  {
    path: "/warehouse-management",
    name: "Quản lý kho",
    isSideBar: false,
    isAvailable: true,
    element: <Route404 />,
  },
  {
    path: "/product-management",
    name: "Quản lý sản phẩm",
    isSideBar: false,
    isAvailable: true,
    element: <Route404 />,
  },
  {
    path: "/dashboard",
    name: "Bảng điều khiển",
    isSideBar: false,
    isAvailable: true,
    element: <Route404 />,
  },
];

export default routes;
