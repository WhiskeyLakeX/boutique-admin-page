import { notification } from "antd";
import { requestTypeToNotification } from "./RequestTypeNotificationConvert";
import httpStatus from "http-status";

const notifyConfig = notification.config({
  placement: "topRight",
  duration: 3,
  maxCount: 3,
});

export function handleErrorGeneral(): void {
  notification.error({
    ...notifyConfig,
    message: "Có lỗi xảy ra, vui lòng thử lại!",
  });
}

export function handleSuccess(type: string | undefined) {
  notification.success({
    ...notifyConfig,
    message: `${requestTypeToNotification(type)} thành công!`,
  });
}

export function handleNoValidAccessToken() {
  console.log("Valid");
  notification.warning({
    ...notifyConfig,
    message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
  });
}

export function handleErrorDataRequest(
  type: string | undefined,
  status_code?: number
) {
  notification.warning({
    ...notifyConfig,
    message: `${requestTypeToNotification(type)} thất bại!`,
    description: status_code
      ? `Error code: ${status_code} <-> Message: ${httpStatus[status_code]}`
      : undefined,
  });
}
