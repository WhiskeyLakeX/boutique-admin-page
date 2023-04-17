import React from "react";
import { IManipulationModal } from "../../../interface/modal/ManipulationModalInterface";
import { GlobalModal } from "../../../module/component/Modal";
import { Form } from "antd";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { requiredMessage } from "../../../module/utils/ValidationMesssage";
import { ICategory } from "../../../interface/category-management/CategoryInterface";
import { useMutation } from "react-query";
import {
  createCategory,
  updateCategory,
} from "../../../api/collection/CategoryManagement_API";

const CategoryManipulationModal = ({
  type,
  onOk,
  isOpen,
  cancel,
  selectedRecord,
  refetch,
}: IManipulationModal) => {
  const [form] = Form.useForm();
  const categoryCreateMutation = useMutation(createCategory);
  const categoryUpdateMutation = useMutation(updateCategory);
  const handleSubmit = (formData: ICategory) => {
    if (type === "create") {
      categoryCreateMutation.mutate(formData, {
        onSuccess: () => {
          refetch();
          cancel();
        },
      });
    } else {
      const data = { ...formData, id: selectedRecord.id };
      categoryUpdateMutation.mutate(data, {
        onSuccess: () => {
          refetch();
          cancel();
        },
      });
    }
  };
  return (
    <GlobalModal
      title={
        type === "create" ? "Đăng ký danh mục" : "Cập nhật thông tin danh mục"
      }
      open={isOpen}
      onCancel={cancel}
      confirmLoading={true}
      footer={null}
      width={"fit-content"}
      destroyOnClose={true}
    >
      <Form
        form={form}
        style={{ minWidth: 300 }}
        layout={"vertical"}
        onFinish={handleSubmit}
      >
        <Form.Item
          name={"name"}
          label="Tên danh mục"
          rules={[{ required: true, message: requiredMessage("tên danh mục") }]}
        >
          <GlobalInput
            className={"required"}
            placeholder="Tên danh mục"
            allowClear
            defaultValue={selectedRecord ? selectedRecord.name : null}
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

export default CategoryManipulationModal;
