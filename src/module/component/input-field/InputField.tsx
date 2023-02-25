import React, { ReactNode, useState } from "react";
import "./index.scss";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

interface ITextInputProps {
  title?: string;
  titleDirection?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  direction?: string;
}

function InputField(props: ITextInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  function isPasswordType() {
    return props?.type === "password";
  }

  return (
    <div
      className={`i-wrapper ${
        props.titleDirection === "horizontal"
          ? "d-flex-horizontal"
          : "d-flex-vertical"
      }`}
    >
      {props.title ? (
        <div className="i-title t-h5 t-bold">{props?.title}</div>
      ) : (
        ""
      )}
      <input
        type={
          isPasswordType() ? (isShowPassword ? "text" : "password") : "text"
        }
        className="text-field t-h5"
        placeholder={props?.placeholder}
      />
      {isPasswordType() ? (
        isShowPassword ? (
          <EyeInvisibleFilled
            className="show-pass-btn"
            onClick={showPassword}
          />
        ) : (
          <EyeFilled className="show-pass-btn" onClick={showPassword} />
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default InputField;
