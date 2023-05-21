import React, { useEffect } from "react";
import { IManipulationModal } from "../../../interface/modal/ManipulationModalInterface";
import { GlobalModal } from "../../../module/component/Modal";
import { Form, FormInstance } from "antd";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { requiredMessage } from "../../../module/utils/ValidationMesssage";
import { IBrand } from "../../../interface/brand-management/IBrand";
import { useMutation } from "react-query";
import {
  createBrand,
  updateBrand,
} from "../../../api/collection/BrandManagement_API";

const BrandManipulationModal = ({
  type,
  onOk,
  isOpen,
  cancel,
  selectedRecord,
  refetch,
}: IManipulationModal) => {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const BrandCreateMutation = useMutation(createBrand);
  const BrandUpdateMutation = useMutation(updateBrand);
  const handleSubmit = (formData: IBrand) => {
    console.log("data", formData);
    if (type === "create") {
      BrandCreateMutation.mutate(formData, {
        onSuccess: () => {
          refetch();
          cancel();
        },
      });
    } else {
      BrandUpdateMutation.mutate(
        { ...formData, id: selectedRecord.id },
        {
          onSuccess: () => {
            refetch();
            cancel();
          },
        }
      );
    }
  };
  useEffect(() => {
    return () => {
      formRef.current?.resetFields();
    };
  }, [type]);

  return (
    <GlobalModal
      title={
        type === "create"
          ? "Đăng ký thương hiệu"
          : "Cập nhật thông tin thương hiệu"
      }
      open={isOpen}
      onCancel={cancel}
      confirmLoading={true}
      footer={null}
      width={"fit-content"}
    >
      <Form
        form={form}
        style={{ minWidth: 300 }}
        layout={"vertical"}
        onFinish={handleSubmit}
        ref={formRef}
      >
        <Form.Item
          name={"name"}
          label="Tên thương hiệu"
          rules={[
            { required: true, message: requiredMessage("tên thương hiệu") },
          ]}
        >
          <GlobalInput
            className={"required"}
            placeholder="Tên thương hiệu"
            allowClear
            defaultValue={type === "edit" ? selectedRecord.name : null}
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

export default BrandManipulationModal;
