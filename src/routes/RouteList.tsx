import React, { ReactNode } from "react";
import Route404 from "../pages/page_404/Route404";
import Login from "../pages/common/login/Login";
import UserManagement from "../pages/user-management/index";
import LayoutProvider from "../module/utils/LayoutProvider";

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
    path: "*",
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
    isSideBar: true,
    isAvailable: true,
    element: <UserManagement />,
  },
  {
    path: "/user-management",
    name: "Quản lý người dùng",
    isSideBar: true,
    isAvailable: true,
    element: <Login />,
  },
  {
    path: "/warehouse-management",
    name: "Quản lý kho",
    isSideBar: true,
    isAvailable: true,
    element: <Login />,
  },
  {
    path: "/product-management",
    name: "Quản lý sản phẩm",
    isSideBar: true,
    isAvailable: true,
    element: <Login />,
  },
];

routes.forEach((item, index, array) => {
  console.log(item.isSideBar);
  if (item.isSideBar === true) {
    item["element"] = <LayoutProvider child={item.element} key={index} />;
  }
});

export default routes;
