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
  return (
    <InputNumber
      {...props}
      style={{
        maxWidth: "200px",
      }}
    />
  );
};

export { GlobalInput, GlobalInputSearch, GlobalInputNumber };
