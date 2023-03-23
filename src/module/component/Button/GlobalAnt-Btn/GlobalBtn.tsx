import React from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

const GlobalBtn = (
  props: JSX.IntrinsicAttributes &
    Partial<
      {
        href: string;
        target?: string | undefined;
        onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
      } & BaseButtonProps &
        Omit<
          React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
          "type" | "onClick"
        > & {
          htmlType?: "button" | "submit" | "reset" | undefined;
          onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
        } & Omit<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          "type" | "onClick"
        >
    > &
    React.RefAttributes<HTMLElement>
): React.ReactElement => {
  return <Button {...props} />;
};

export default GlobalBtn;
