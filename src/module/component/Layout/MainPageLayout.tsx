import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { Layout, Menu, Avatar } from "antd";
import SidebarItem from "./Sidebar/SidebarItem";
import RouteList, { IRoute } from "../../../routes/RouteList";
import { useSelector, useDispatch } from "react-redux";
import UserAction from "../../../redux/actions/UserAction";
import { handleSuccess } from "../../utils/Notification";
import { PATHNAME } from "../../../config";
import { useNavigate } from "react-router-dom";
import { forEach } from "lodash";
import { handleConvertArrToPath } from "../../utils/ConvertArrToPath";
import Sidebar from "./Sidebar/Sidebar";
interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const MainPageLayout: React.FC = (props: IDashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState<string>("");
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(UserAction.userLogout());
    handleSuccess("logout");
    setTimeout(() => {
      window.location.href = PATHNAME.LOGIN;
    }, 500);
  };
  console.log("Layout rerender");

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
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Header className="antd-header">
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

export default MainPageLayout;
