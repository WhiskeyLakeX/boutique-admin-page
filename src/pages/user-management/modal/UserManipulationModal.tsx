import React, { useEffect, useState } from "react";
import { GlobalModal } from "../../../module/component/Modal";
import { Form, FormInstance } from "antd";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { requiredMessage } from "../../../module/utils/ValidationMesssage";
import IUser, { IAdminAccount } from "../../../interface/user-management/IUser";
import GlobalDatepicker from "../../../module/component/Datepicker/GlobalDatepicker";
import GlobalSelect from "../../../module/component/Select/GlobalSelect";

interface IUserManipulation {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
  userType?: string;
  selectedRecord?: IUser | IAdminAccount;
}

const UserManipulationModal = ({
  type,
  userType,
  onOk,
  isOpen,
  cancel,
  selectedRecord,
}: IUserManipulation) => {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const [selectedRecordReceive, setSelectedRecordReceive] =
    useState(selectedRecord);
  const handleSubmit = (values: IAdminAccount | IUser) => {
    console.log(values);
  };

  useEffect(() => {
    setSelectedRecordReceive(selectedRecord);
    console.log(selectedRecord);
  }, [selectedRecord]);

  return (
    <GlobalModal
      title={
        type === "create"
          ? "Đăng ký người dùng mới"
          : "Cập nhật thông tin người dùng"
      }
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className={"modal-wrapper"}
    >
      <Form
        form={form}
        style={{ minWidth: 300 }}
        layout={"vertical"}
        onFinish={handleSubmit}
        ref={formRef}
      >
        <Form.Item
          name={"username"}
          label="Tên đăng nhập"
          rules={[
            { required: true, message: requiredMessage("tên đăng nhập") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder="Tên đăng nhập"
            allowClear
            defaultValue={
              type === "edit" ? selectedRecordReceive?.username : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Mật khẩu"
          rules={[{ required: true, message: requiredMessage("mật khẩu") }]}
        >
          <GlobalInput
            className={type === "edit" ? "" : "required"}
            placeholder={type === "edit" ? "Mật khẩu mới" : "Mật khẩu"}
            allowClear
            type={"password"}
          />
        </Form.Item>
        <Form.Item
          name={"fullname"}
          label="Tên người dùng"
          rules={[
            { required: true, message: requiredMessage("tên người dùng") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Tên người dùng"}
            allowClear
            defaultValue={
              type === "edit" ? selectedRecordReceive?.fullname : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"dob"}
          label="Ngày sinh"
          rules={[{ required: true, message: requiredMessage("ngày sinh") }]}
        >
          <GlobalDatepicker
            placeholder={"Ngày sinh"}
            allowClear
            defaultValue={
              type === "edit" ? selectedRecordReceive?.dob : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"Số điện thoại"}
          label="Số điện thoại"
          rules={[
            { required: true, message: requiredMessage("số điện thoại") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Số điện thoại"}
            allowClear
            type={"number"}
            defaultValue={
              type === "edit" ? selectedRecordReceive?.phone_number : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"Địa chỉ"}
          label="Địa chỉ"
          rules={[{ required: true, message: requiredMessage("địa chỉ") }]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Địa chỉ"}
            allowClear
            defaultValue={
              type === "edit" ? selectedRecordReceive?.address : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"Email"}
          label="Email"
          rules={[{ required: true, message: requiredMessage("email") }]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Email"}
            allowClear
            defaultValue={
              type === "edit" ? selectedRecordReceive?.email : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"gender"}
          label="Giới tính"
          rules={[{ required: true, message: requiredMessage("giới tính") }]}
        >
          <GlobalSelect
            defaultValue={selectedRecordReceive?.gender ?? 0}
            id="gender"
            size={"large"}
            options={[
              { value: 0, label: "Nam" },
              {
                value: 1,
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <GlobalBtn type="primary" htmlType={"submit"}>
            {type === "create" ? "Đăng ký" : "Cập nhật"}
          </GlobalBtn>
        </Form.Item>
      </Form>
    </GlobalModal>
  );
};

export default UserManipulationModal;
