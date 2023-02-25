import React, { ReactNode } from "react";
import DashboardLayout from "../module/component/layout/DashboardLayout";
import Route404 from "../pages/page_404/Route404";
import Login from "../pages/common/login/Login";
import UserManagement from "../pages/user-management/index";

export interface IRoute {
  path: string;
  name: string;
  isSideBar: boolean;
  isAvailable?: boolean;
  children?: IRoute[];
  element?: ReactNode;
}

const LayoutProvider = (props: ReactNode): React.ReactNode => {
  return <DashboardLayout>{props}</DashboardLayout>;
};

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
    isSideBar: false,
    isAvailable: true,
    element: <Login />,
  },
  {
    path: "/user-management",
    name: "Quản lý người dùng",
    isSideBar: false,
    isAvailable: true,
    element: <UserManagement />,
  },
  {
    path: "/warehouse-management",
    name: "Quản lý kho",
    isSideBar: false,
    isAvailable: true,
    element: <DashboardLayout />,
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

routes.forEach((item, index, array) => {
  if (item?.isSideBar === true) {
    routes[index] = {
      ...routes[index], // @ts-ignore
      element: <LayoutProvider props={item.element} />,
    };
  }
});

export default routes;
