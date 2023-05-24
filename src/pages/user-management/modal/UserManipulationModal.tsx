import React, { useEffect, useState } from "react";
import { GlobalModal } from "../../../module/component/Modal";
import { Form, FormInstance } from "antd";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { requiredMessage } from "../../../module/utils/ValidationMesssage";
import IUser, { IAdminAccount } from "../../../interface/user-management/IUser";
import GlobalDatepicker from "../../../module/component/Datepicker/GlobalDatepicker";
import GlobalSelect from "../../../module/component/Select/GlobalSelect";
import { createUser, editUser } from "../../../api/collection/UserManagement";
import { useMutation } from "react-query";
import dayjs from "dayjs";
import { registerAdminAccount } from "../../../api/collection/Login_API";

interface IUserManipulation {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
  userType?: string;
  selectedRecord?: IUser | IAdminAccount;
  refetch: () => void;
  typeOfScreen?: string;
}

const UserManipulationModal = ({
  type,
  userType,
  onOk,
  isOpen,
  cancel,
  selectedRecord,
  refetch,
  typeOfScreen,
}: IUserManipulation) => {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const [initialValue, setInitialValue] = useState(
    type === "edit" ? selectedRecord : undefined
  );

  const userCreateMutation = useMutation(
    typeOfScreen === "admin" ? registerAdminAccount : createUser
  );
  const userUpdateMutation = useMutation(editUser);
  console.log("Type of user", typeOfScreen);
  const handleSubmit = (values: IAdminAccount | IUser) => {
    if (type !== "edit") {
      userCreateMutation.mutate(values, {
        onSuccess: () => {
          refetch();
          cancel();
          form.resetFields();
        },
      });
    } else {
      userUpdateMutation.mutate(values, {
        onSuccess: () => {
          refetch();
          cancel();
          form.resetFields();
        },
      });
    }
  };
  useEffect(() => {
    form.resetFields();
    if (type === "edit") {
      setInitialValue({
        ...selectedRecord,
        password: "",
        // @ts-ignore
        dob: dayjs(selectedRecord?.dob),
      });
    }
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
      destroyOnClose={true}
    >
      <Form
        form={form}
        style={{ minWidth: 300 }}
        layout={"vertical"}
        onFinish={handleSubmit}
        ref={formRef}
        initialValues={type === "edit" ? initialValue : undefined}
      >
        <Form.Item
          name={"username"}
          label="Tên đăng nhập"
          rules={[
            {
              required: type !== "edit",
              message: requiredMessage("tên đăng nhập"),
            },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder="Tên đăng nhập"
            allowClear
            disabled={type === "edit" ? true : false}
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Mật khẩu"
          rules={[
            { required: type !== "edit", message: requiredMessage("mật khẩu") },
          ]}
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
            {
              required: type !== "edit",
              message: requiredMessage("tên người dùng"),
            },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Tên người dùng"}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name={"dob"}
          label="Ngày sinh"
          rules={[
            {
              required: type !== "edit",
              message: requiredMessage("ngày sinh"),
            },
          ]}
        >
          <GlobalDatepicker
            placeholder={"Ngày sinh"}
            allowClear
            defaultValue={
              type === "edit" && initialValue?.dob
                ? dayjs(initialValue?.dob, "YYYY/MM/DD")
                : undefined
            }
          />
        </Form.Item>
        <Form.Item
          name={"phone_number"}
          label="Số điện thoại"
          rules={[
            {
              required: type !== "edit",
              message: requiredMessage("số điện thoại"),
            },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Số điện thoại"}
            allowClear
            type={"number"}
          />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Địa chỉ"
          rules={[
            { required: type !== "edit", message: requiredMessage("địa chỉ") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Địa chỉ"}
            allowClear
            defaultValue={type === "edit" ? initialValue?.address : undefined}
          />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            { required: type !== "edit", message: requiredMessage("email") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder={"Email"}
            allowClear
            defaultValue={type === "edit" ? initialValue?.email : undefined}
          />
        </Form.Item>
        <Form.Item
          name={"gender"}
          label="Giới tính"
          rules={[
            {
              required: type !== "edit",
              message: requiredMessage("giới tính"),
            },
          ]}
        >
          <GlobalSelect
            defaultValue={initialValue?.gender || { value: 0, label: "Nam" }}
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
