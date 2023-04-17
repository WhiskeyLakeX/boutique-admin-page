import React from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";

const GlobalBreadcrumb = (props: JSX.IntrinsicAttributes & BreadcrumbProps) => {
  console.log("from global", props);
  return <Breadcrumb {...props} />;
};

export default GlobalBreadcrumb;
