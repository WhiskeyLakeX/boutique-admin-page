import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./styles.scss";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = (props: IDashboardLayoutProps) => {
  return (
    <div className="wrapper">
      <div className="dashboard-layout-container">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
};

export default DashboardLayout;
