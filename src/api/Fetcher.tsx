import axios, { AxiosRequestConfig } from "axios";
import { NETWORK_CONFIG } from "../config";
import { notification } from "antd";
import httpStatus from "http-status";
import { requestTypeToNotification } from "../module/utils/RequestTypeNotificationConvert";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: NETWORK_CONFIG.API_BASE_URL,
  timeout: NETWORK_CONFIG.TIMEOUT,
});
const notifyConfig = notification.config({
  placement: "topRight",
  duration: 3,
  maxCount: 3,
});
const controller = new AbortController();
function handleErrorGeneral(): void {
  notification.error({
    ...notifyConfig,
    message: "Có lỗi xảy ra, vui lòng thử lại!",
  });
}

function handleSuccess(type: string | undefined) {
  notification.success({
    ...notifyConfig,
    message: `${requestTypeToNotification(type)} thành công!`,
  });
}

function handleErrorDataRequest(
  type: string | undefined,
  status_code?: number
) {
  notification.warning({
    ...notifyConfig,
    message: `${requestTypeToNotification(type)} thất bại!`,
    description: status_code
      ? `Error code: ${status_code} + \n + Message: ${httpStatus[status_code]}`
      : undefined,
  });
  controller.abort();
}

async function fetcher(config: AxiosRequestConfig, reqType?: string) {
  return new Promise((resolve, reject) => {
    try {
      axiosInstance
        .request(config)
        .then((res) => {
          handleSuccess(reqType);
          if (res?.data?.status_code !== 200) {
            handleErrorDataRequest(reqType, res?.data?.status_code);
          }
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
