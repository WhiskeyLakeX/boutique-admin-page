import React, { useEffect } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller, useForm } from "react-hook-form";
import "./styles.scss";
import { useMutation, useQuery } from "react-query";
import { CATEGORY_MANAGEMENT } from "../../../../api/KeyQuery";
import { getAllCategory } from "../../../../api/collection/CategoryManagement_API";
import {
  maxLengthMessage,
  requiredMessage,
} from "../../../../module/utils/ValidationMesssage";
import { Button, Input, InputNumber, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IProduct } from "../../../../interface/product-management/ProductInterface";
import {
  createProduct,
  updateProduct,
} from "../../../../api/collection/ProductManagement_API";

interface IModalManipulation {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
  selectedRecord?: IProduct;
  refetch: () => void;
}

const ProductManipulationModal = ({
  selectedRecord,
  type,
  onOk,
  isOpen,
  cancel,
  refetch,
}: IModalManipulation) => {
  const defaultValues = {
    name: "",
    price: 0,
    category_id: 0,
    short_description: "",
    long_description: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });
  const { data: listOfCategory } = useQuery(
    CATEGORY_MANAGEMENT.GET_LIST_CATEGORY,
    getAllCategory
  );
  const productCreateMutation = useMutation(createProduct);
  const productUpdateMutation = useMutation(updateProduct);
  const onSubmitForm = (data: any) => {
    if (type === "create") {
      productCreateMutation.mutate(data, {
        onSuccess: () => {
          refetch();
          cancel();
        },
      });
    } else {
      productUpdateMutation.mutate(data, {
        onSuccess: () => {
          refetch();
          cancel();
        },
      });
    }
  };

  useEffect(() => {
    if (type === "edit" && selectedRecord) {
      reset({
        name: selectedRecord?.name,
        price: selectedRecord?.price,
        category_id: selectedRecord?.category?.id,
        short_description: selectedRecord?.short_description,
        long_description: selectedRecord?.long_description,
        img1: selectedRecord?.img1,
        img2: selectedRecord?.img2,
        img3: selectedRecord?.img3,
        img4: selectedRecord?.img4,
      });
    } else {
      reset({ ...defaultValues, category_id: undefined });
    }
  }, [type]);

  return (
    <Modal
      title={
        type === "create"
          ? "Đăng ký sản phẩm mới"
          : "Cập nhật thông tin sản phẩm"
      }
      open={isOpen}
      onCancel={cancel}
      confirmLoading={true}
      footer={null}
      width={"fit-content"}
      destroyOnClose={true}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={"manipulation-form-wrapper"}
      >
        <div className={"form-wrapper"}>
          <div className={"product-info-section"}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: requiredMessage("tên sản phẩm"),
                maxLength: {
                  value: 255,
                  message: maxLengthMessage("tên sản phẩm", 255),
                },
              }}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="name" className={"required"}>
                    Tên sản phẩm
                  </label>
                  <Input
                    {...field}
                    placeholder="Nhập tên sản phẩm"
                    className={"mt-5"}
                  />
                  {errors.name && (
                    <span className={"error-message"}>
                      {errors.name.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: requiredMessage("giá tiền sản phẩm"),
              }}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="price" className={"required"}>
                    Giá tiền
                  </label>
                  <InputNumber
                    {...field}
                    placeholder="Nhập giá sản phẩm"
                    addonAfter={"$"}
                    min={0}
                  />
                  {errors.price && (
                    <span className={"error-message"}>
                      {errors.price.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="category_id"
              control={control}
              rules={{
                required: requiredMessage("danh mục sản phẩm"),
              }}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="category_id" className={"required"}>
                    Danh mục sản phẩm
                  </label>
                  <Select
                    {...field}
                    placeholder="Chọn danh mục"
                    allowClear
                    //@ts-ignored
                    options={listOfCategory?.data?.data.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                  />
                  {errors.category_id && (
                    <span className={"error-message"}>
                      {errors.category_id.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="short_description"
              control={control}
              rules={{
                required: requiredMessage("mô tả ngắn"),
              }}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="price" className={"required"}>
                    Mô tả ngắn
                  </label>
                  <TextArea
                    {...field}
                    placeholder="Nhập mô tả ngắn"
                    maxLength={100}
                    showCount
                    allowClear
                  />
                  {errors.short_description && (
                    <span className={"error-message"}>
                      {errors.short_description.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="img1"
              control={control}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="img1">Link ảnh 1</label>
                  <Input {...field} placeholder="Nhập link ảnh 1" />
                </div>
              )}
            />
            <Controller
              name="img2"
              control={control}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="img2">Link ảnh 2</label>
                  <Input {...field} placeholder="Nhập link ảnh 2" />
                </div>
              )}
            />
            <Controller
              name="img3"
              control={control}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="img3">Link ảnh 3</label>
                  <Input {...field} placeholder="Nhập link ảnh 3" />
                </div>
              )}
            />
            <Controller
              name="img4"
              control={control}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="img4">Link ảnh 4</label>
                  <Input {...field} placeholder="Nhập link ảnh 4" />
                </div>
              )}
            />
          </div>
          <div className={"ck-editor-section"}>
            <Controller
              name="long_description"
              control={control}
              rules={{
                required: requiredMessage("mô tả chi tiết"),
              }}
              render={({ field }) => (
                <div className={"form-item"}>
                  <label htmlFor="long_description" className={"required"}>
                    Mô tả chi tiết
                  </label>
                  <CKEditor
                    {...field}
                    editor={ClassicEditor}
                    config={{
                      placeholder: "Nhập mô tả chi tiết",
                    }}
                    data={
                      type === "edit" ? selectedRecord?.long_description : ""
                    }
                    onChange={(event: any, editor: { getData: () => any }) => {
                      setValue("long_description", editor.getData());
                    }}
                  />
                  {errors.long_description && (
                    <span className={"error-message"}>
                      {errors.long_description.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className={"form-action-btn"}>
          <Button
            htmlType="button"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit" onClick={() => {}}>
            {type === "edit" ? "Cập nhật" : "Đăng ký"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductManipulationModal;
