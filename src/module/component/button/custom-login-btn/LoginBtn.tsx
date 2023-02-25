import React, { ReactElement } from "react";
import "./index.scss";

interface IButtonProps {
  height?: string;
  width?: string;
  label?: string;
  frIcon?: ReactElement;
  bkIcon?: ReactElement;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  labelClass?: string;
  labelTextColor?: string;
  onClick?: React.Dispatch<React.SetStateAction<string>>;

  margin?: string;
  padding?: string;
}

const LoginBtn = (props: IButtonProps) => {
  return (
    <div
      role="button"
      className="b-wrapper"
      style={{
        background: `${
          props.backgroundColor ? props.backgroundColor : "#FFFFFF"
        }`,
        borderRadius: `${props.borderRadius ? props.borderRadius : 0}`,
        height: `${props.height ? props.height : "40px"}`,
        width: `${props.width ? props.width : "fit-content"}`,
        border: `${props.border ? props.border : ""}`,
        margin: `${props.margin ? props.margin : ""}`,
        padding: `${props.padding ? props.padding : ""}`,
      }}
    >
      <div
        className={`btn-label ${props.labelClass}`}
        style={{
          color: props.labelTextColor ? props.labelTextColor : "white",
        }}
      >
        {props.label}
      </div>
    </div>
  );
};

export default LoginBtn;
