import axios, { AxiosRequestConfig } from "axios";
import { NETWORK_CONFIG } from "../config";
import { notification } from "antd";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: NETWORK_CONFIG.API_BASE_URL,
});
const notifyConfig = notification.config({
  placement: "topLeft",
  duration: 3,
  maxCount: 3,
  signal: calAbortSignal(),
});
function calAbortSignal() {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), NETWORK_CONFIG.TIMEOUT);
  return abortController.signal;
}
function handleErrorGeneral(): void {
  notification.error({
    ...notifyConfig,
    message: "Có lỗi xảy ra, vui lòng thử lại!",
  });
}

function handleSuccess(type: string | undefined) {
  notification.success({
    ...notifyConfig,
    message: `${
      type === "create" ? "Đăng ký" : type === "edit" ? "Cập nhật" : "Xoá"
    } bản ghi thành công!`,
  });
}

function handleErrorDataRequest(type: string | undefined, errorCode?: number) {
  notification.warning({
    ...notifyConfig,
    message: `${
      type === "create" ? "Đăng ký" : type === "edit" ? "Cập nhật" : "Xoá"
    } bản ghi thất bại!`,
    description: errorCode ? `Error code: ${errorCode}` : undefined,
  });
}

async function fetcher(config: AxiosRequestConfig, reqType?: string) {
  return new Promise((resolve, reject) => {
    try {
      axiosInstance
        .request(config)
        .then((res) => {
          handleSuccess(reqType);
          resolve(res);
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
