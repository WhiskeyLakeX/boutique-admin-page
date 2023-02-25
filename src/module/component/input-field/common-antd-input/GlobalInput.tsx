import React from "react";
import { Input } from "antd";

interface IGlobalInput {
  type?: string;
  size?: string;
  disable?: boolean;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const GlobalInput = (props: IGlobalInput) => {
  return (
    <Input
      type={props.type ? props.type : ""}
      placeholder={props.placeholder ? props.placeholder : ""}
      disabled={props.disable ? props.disable : false}
      onFocus={props.onFocus ? props.onFocus : () => {}}
    />
  );
};

export default GlobalInput;
