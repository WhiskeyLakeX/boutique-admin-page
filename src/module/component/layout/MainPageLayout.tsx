import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { Layout, Menu, Avatar } from "antd";
import SidebarItem from "./Sidebar/SidebarItem";
interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const MainPageLayout: React.FC = (props: IDashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={"antd-layout"}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
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
          {collapsed || <div className="username t-h5 t-bold">Son Nguyen</div>}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={SidebarItem}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="antd-header" style={{}}>
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
        </Header>
        <Content className="antd-content">{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainPageLayout;
