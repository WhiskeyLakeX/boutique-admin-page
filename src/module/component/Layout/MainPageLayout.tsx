import React, { memo, useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { Avatar, Layout } from "antd";

import { useDispatch, useSelector } from "react-redux";
import UserAction from "../../../redux/actions/UserAction";
import { handleSuccess } from "../../utils/Notification";
import { PATHNAME } from "../../../config";

import Sidebar from "./Sidebar/Sidebar";
import GlobalBreadcrumb from "./Breadcrumb/GlobalBreadcrumb";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}
interface breadcrumbItem {
  title: string;
}

const { Header, Sider, Content } = Layout;

const MainPageLayout: React.FC = (props: IDashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [breadcrumbItems, setBreadcrumbItems] = useState<breadcrumbItem[]>();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(UserAction.userLogout());
    handleSuccess("logout");
    setTimeout(() => {
      window.location.href = PATHNAME.LOGIN;
    }, 500);
  };
  // console.log("Layout rerender");
  const getListOfBreadcrumbItem = (listOfBreadcrumb: string[]) => {
    const refinedList = listOfBreadcrumb.map((value, index, array) => {
      return {
        title: value,
      };
    });
    console.log("ob", refinedList);
    setBreadcrumbItems(refinedList);
  };

  useEffect(() => {
    //@ts-ignored
    const username = selector.userReducer.username;
    setUsername(username);
  }, [username]);

  return (
    <Layout className={"antd-layout"}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        breakpoint={"lg"}
      >
        <div
          className="user-information"
          style={{
            padding: `${collapsed ? "20px" : "40px"} 0px ${
              collapsed ? "20px" : "25px"
            }`,
          }}
        >
          <div className="avatar-wrapper">
            <Avatar
              size={collapsed ? 50 : 90}
              src={
                "https://images.macrumors.com/t/iLX-KRWgflfK6bQrlM2pZkOQWvw=/1600x/article-new/2020/11/EmCWpR0WMAAzfcY.jpeg"
              }
            />
          </div>
          {collapsed || <div className="username t-h5 t-bold">{username}</div>}
        </div>
        <Sidebar getListOfBreadcrumbItem={getListOfBreadcrumbItem} />
      </Sider>
      <Layout className="site-layout">
        <Header className="antd-header">
          <div className={"left-wrapper"}>
            <div
              onClick={() => setCollapsed(!collapsed)}
              role="button"
              className="trigger toggle-btn"
            >
              {collapsed ? (
                <MenuUnfoldOutlined size={15} />
              ) : (
                <MenuFoldOutlined size={15} />
              )}
            </div>
            {/*// @ts-ignore */}
            <GlobalBreadcrumb items={breadcrumbItems} />
          </div>

          <div className="log-out-btn" role={"button"} onClick={handleLogout}>
            <div className="log-out-text">Đăng xuất</div>
            <LogoutOutlined
              className="log-out-icon"
              style={{
                fontSize: "18px",
              }}
            />
          </div>
        </Header>
        <Content className="antd-content">{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(MainPageLayout);
