import React from "react";
import { GlobalModal } from "../../../module/component/Modal";

interface IUserManipulation {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
}

const UserManipulationModal = ({
  type,
  onOk,
  isOpen,
  cancel,
}: IUserManipulation) => {
  return (
    <GlobalModal
      title={
        type === "create"
          ? "Đăng ký người dùng mới"
          : "Cập nhật thông tin người dùng"
      }
      open={isOpen}
      onCancel={cancel}
      confirmLoading={true}
    ></GlobalModal>
  );
};

export default UserManipulationModal;
