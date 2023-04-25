export function requestTypeToNotification(reqType?: string) {
  switch (reqType) {
    case "login":
      return "Đăng nhập";
    case "register":
      return "Đăng ký";
    case "create":
      return "Đăng ký";
    case "edit":
      return "Cập nhật";
    case "delete":
      return "Xoá";
    case "logout":
      return "Đăng xuất";
    default:
      return "Tải danh sách bản ghi";
  }
}
