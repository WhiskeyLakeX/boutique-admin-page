import React, { useEffect } from "react";
import { Spin } from "antd";
import { store } from "../redux/store";
import { handleNoValidAccessToken } from "../module/utils/Notification";
import { PATHNAME } from "../config";

const InitialPage = () => {
  useEffect(() => {
    if (
      // @ts-ignore
      !store.getState().userReducer.accessToken
    ) {
      handleNoValidAccessToken();
      setTimeout(() => {
        window.location.href = PATHNAME.LOGIN;
      }, 1500);
    } else {
      setTimeout(() => {
        window.location.href = PATHNAME.HOME;
      }, 1500);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default InitialPage;
