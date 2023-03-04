import React from "react";
import MainPageLayout from "../component/layout/MainPageLayout";

type LayoutProps = {
  child: React.ReactNode;
};

export default function LayoutProvider({
  child,
}: LayoutProps): React.ReactElement {
  // @ts-ignore
  return <MainPageLayout>{child}</MainPageLayout>;
}
