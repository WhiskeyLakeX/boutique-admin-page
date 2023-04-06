import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { Layout, Menu, Avatar } from "antd";
import SidebarItem from "./Sidebar/SidebarItem";
import { useNavigate } from "react-router-dom";
import RouteList, { IRoute } from "../../../routes/RouteList";
import { useSelector, useDispatch } from "react-redux";
import UserAction from "../../../redux/actions/UserAction";
import { handleSuccess } from "../../utils/Notification";
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
      window.location.href = "/login";
    }, 500);
  };
  const findNavigatePath = (arr: IRoute[], key: string): string => {
    let finalPath = "";
    arr.forEach((item) => {
      if (item.path && item.path === key) {
        finalPath.concat(item.path);
        console.log("final path", finalPath);
      }
      if (item.children && item.children.length > 0) {
        findNavigatePath(item.children, item.path);
      }
    });
    return finalPath;
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

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={SidebarItem()}
          onSelect={({ item, key, keyPath }) => {
            console.log("Key ", key, "   ", findNavigatePath(RouteList, key));
          }}
        />
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
