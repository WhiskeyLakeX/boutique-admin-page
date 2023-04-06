import axios, { AxiosRequestConfig } from "axios";
import { NETWORK_CONFIG } from "../config";
import { store } from "../redux/store";
import {
  handleErrorGeneral,
  handleSuccess,
  handleNoValidAccessToken,
  handleErrorDataRequest,
} from "../module/utils/Notification";

async function fetcher(config: AxiosRequestConfig, reqType?: string) {
  // @ts-ignore
  let accessToken = store.getState().userReducer.accessToken;
  if (!accessToken && reqType !== "login") {
    handleNoValidAccessToken();
    window.location.href = "/login";
    return;
  }
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
    baseURL: NETWORK_CONFIG.API_BASE_URL,
    timeout: NETWORK_CONFIG.TIMEOUT,
  });
  return new Promise((resolve, reject) => {
    try {
      axiosInstance
        .request(config)
        .then((res) => {
          if (!res?.data?.status_code.toString().startsWith("20")) {
            handleErrorDataRequest(reqType, res?.data?.status_code);
            return;
          } else {
            handleSuccess(reqType);
            resolve(res);
          }
        })
        .catch((err) => {
          handleErrorDataRequest(
            reqType,
            err.response ? err.response.status : undefined
          );
          reject(err);
        });
    } catch (e) {
      handleErrorGeneral();
      reject(e);
    }
  });
}

export { fetcher };
