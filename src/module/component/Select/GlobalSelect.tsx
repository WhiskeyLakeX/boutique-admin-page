import React from "react";
import { RefSelectProps, Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

const GlobalSelect = (
  props: JSX.IntrinsicAttributes &
    SelectProps<any, DefaultOptionType> & { children?: React.ReactNode } & {
      ref?: React.Ref<RefSelectProps> | undefined;
    }
) => {
  return <Select {...props} />;
};

export default GlobalSelect;
