import React, { useState } from "react";
import { GlobalModal } from "../../../../module/component/Modal";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller, useForm } from "react-hook-form";
import {
  GlobalInput,
  GlobalInputNumber,
} from "../../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalSelect from "../../../../module/component/Select/GlobalSelect";
import GlobalBtn from "../../../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import "./styles.scss";

interface IUserManipulation {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
}

const ProductManipulationModal = ({
  type,
  onOk,
  isOpen,
  cancel,
}: IUserManipulation) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      category_id: null,
      short_description: "",
      long_description: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    },
  });
  const onSubmitForm = (data: any) => {
    console.log("Collected ", data);
  };
  return (
    <GlobalModal
      title={
        type === "create"
          ? "Đăng ký sản phẩm mới"
          : "Cập nhật thông tin sản phẩm"
      }
      open={isOpen}
      onCancel={cancel}
      confirmLoading={true}
      footer={null}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={"manipulation-form-wrapper"}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className={"form-item"}>
              <label htmlFor="name" className={"required"}>
                Tên sản phẩm
              </label>
              <GlobalInput
                {...field}
                placeholder="Nhập tên sản phẩm"
                className={"mt-5"}
              />
            </div>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <div className={"form-item"}>
              <label htmlFor="price" className={"required"}>
                Giá tiền
              </label>
              <GlobalInputNumber
                {...field}
                placeholder="Nhập giá sản phẩm"
                addonAfter={"$"}
              />
            </div>
          )}
        />
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <div className={"form-item"}>
              <label htmlFor="category_id" className={"required"}>
                Danh mục sản phẩm
              </label>
              <GlobalSelect {...field} placeholder="Chọn danh mục" />
            </div>
          )}
        />
        <Controller
          name="short_description"
          control={control}
          render={({ field }) => (
            <div className={"form-item"}>
              <label htmlFor="price" className={"required"}>
                Mô tả ngắn
              </label>
              <GlobalInput {...field} placeholder="Nhập mô tả ngắn" />
            </div>
          )}
        />
        <Controller
          name="long_description"
          control={control}
          render={({ field }) => (
            <div className={"form-item"}>
              <label htmlFor="price" className={"required"}>
                Mô tả chi tiết
              </label>
              <CKEditor
                {...field}
                editor={ClassicEditor}
                config={{ placeholder: "Nhập mô tả chi tiết", height: "500px" }}
                onChange={(event: any, editor: { getData: () => any }) => {
                  const data = editor.getData();
                }}
              />
            </div>
          )}
        />
        <div className={"form-action-btn"}>
          <GlobalBtn htmlType="button">Reset</GlobalBtn>
          <GlobalBtn type="primary" htmlType="submit">
            Submit
          </GlobalBtn>
        </div>
      </form>
    </GlobalModal>
  );
};

export default ProductManipulationModal;
