import React from "react";
import { Input, InputProps, InputRef } from "antd";
import { SearchProps } from "antd/es/input";

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

export { GlobalInput, GlobalInputSearch };
