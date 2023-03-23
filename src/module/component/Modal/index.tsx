import React from "react";
import { Modal, ModalProps } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
export const GlobalModal = (props: JSX.IntrinsicAttributes & ModalProps) => {
  return <Modal {...props} />;
};

export const DeleteModal = ({
  onCancel,
  onOk,
  isOpen,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}) => {
  return (
    <Modal
      title={
        <div className="title-wrapper">
          <FontAwesomeIcon
            className="icon"
            icon={solid("circle-exclamation")}
          />
          <p>Lưu ý</p>
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      centered={true}
    >
      <p>Xác nhận xoá bản ghi?</p>
    </Modal>
  );
};
