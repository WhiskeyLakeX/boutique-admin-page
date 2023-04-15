import React from "react";
import {
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  InputRef,
} from "antd";
import { SearchProps } from "antd/es/input";
import { ValueType } from "@rc-component/mini-decimal";
import TextArea, { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";

const GlobalInput = (
  props: JSX.IntrinsicAttributes & InputProps & React.RefAttributes<InputRef>
) => {
  return <Input {...props} />;
};

const GlobalInputSearch = (
  props: JSX.IntrinsicAttributes & SearchProps & React.RefAttributes<InputRef>
) => {
  return (
    <Input.Search
      {...props}
      style={{
        maxWidth: "200px",
      }}
    />
  );
};

const GlobalInputNumber = (
  props: JSX.IntrinsicAttributes &
    InputNumberProps<ValueType> & { children?: React.ReactNode } & {
      ref?: React.Ref<HTMLInputElement> | undefined;
    }
) => {
  return <InputNumber {...props} />;
};

const GlobalTextArea = (
  props: JSX.IntrinsicAttributes &
    TextAreaProps &
    React.RefAttributes<TextAreaRef>
) => {
  return <TextArea {...props} />;
};

export { GlobalInput, GlobalInputSearch, GlobalInputNumber, GlobalTextArea };
