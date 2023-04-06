import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import "./styles.scss";
import GlobalBtn from "../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ProductManipulationModal from "./modal/manipulation-modal/ProductManipulationModal";
import { DeleteModal } from "../../module/component/Modal";
import { useQuery, useMutation } from "react-query";
import { PRODUCT_MANAGEMENT } from "../../api/KeyQuery";
import {
  deleteProduct,
  getAllProduct,
} from "../../api/collection/ProductManagement_API";
import { TableRowWidth } from "../../config/TableRowWidth";
import { IProduct } from "../../interface/product-management/ProductInterface";
import DetailModal from "./modal/detail-modal/DetailModal";

const ProductManagement = () => {
  const [productManipulationModalProps, setProductManipulationModalProps] =
    useState({
      type: "",
      isOpen: false,
    });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [detailInformationModalStatus, setDetailInformationModalStatus] =
    useState<{
      isOpen: boolean;
      product: IProduct | null;
    }>({
      isOpen: false,
      product: null,
    });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    isLoading,
    isError,
    data: listOfProduct,
    error,
    refetch,
  } = useQuery(PRODUCT_MANAGEMENT.GET_LIST_PRODUCT, getAllProduct);

  const deleteProductMutation = useMutation(
    PRODUCT_MANAGEMENT.DELETE_PRODUCT,
    deleteProduct
  );
  const handleToggleProductManipulationModal = (type: string) => {
    setProductManipulationModalProps({
      type: type,
      isOpen: !productManipulationModalProps.isOpen,
    });
  };

  const handleToggleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const handleToggleDetailModal = (
    record: IProduct,
    type: "open" | "cancel"
  ) => {
    setDetailInformationModalStatus({
      product: type === "open" ? record : null,
      isOpen: !detailInformationModalStatus.isOpen,
    });
  };

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(selectedRowKeys, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const productTableColumn = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
      width: TableRowWidth.no,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: TableRowWidth.id,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: TableRowWidth.productName,
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      key: "category",
      width: TableRowWidth.category,
    },
    {
      title: "Giá tiền (VND)",
      dataIndex: "price",
      key: "price",
      width: TableRowWidth.price,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "short_description",
      key: "short_description",
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        );
      },
      width: TableRowWidth.product_short_description,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (text: string, record: IProduct, index: number) => {
        return (
          <div className={"list-btn"}>
            <div
              className={"edit btn"}
              role={"button"}
              onClick={() => {
                handleToggleProductManipulationModal("edit");
              }}
            >
              <FontAwesomeIcon icon={solid("pen-to-square")} />
            </div>
            <div
              className={"detail btn"}
              role={"button"}
              onClick={() => {
                handleToggleDetailModal(record, "open");
              }}
            >
              <FontAwesomeIcon icon={solid("info")} />
            </div>
          </div>
        );
      },
      width: TableRowWidth.actionCol,
    },
  ];

  return (
    <div className="management-antd-table-container">
      <div className="utils-bar">
        <Tooltip title={"Từ khoá: "} placement={"topLeft"}>
          <GlobalInputSearch />
        </Tooltip>
        <div className={"action-btn"}>
          <GlobalBtn
            icon={<FontAwesomeIcon className="icon" icon={solid("plus")} />}
            onClick={() => handleToggleProductManipulationModal("create")}
          >
            Đăng ký sản phẩm
          </GlobalBtn>
          <GlobalBtn
            icon={
              <FontAwesomeIcon className="icon" icon={regular("trash-can")} />
            }
            danger
            disabled={selectedRowKeys.length === 0}
            onClick={handleToggleDeleteModal}
          >
            Xoá
          </GlobalBtn>
        </div>
      </div>
      <Table
        className="management-table mt-12"
        columns={productTableColumn}
        //@ts-ignore
        dataSource={listOfProduct?.data?.data.map((item) => {
          return { ...item, key: item.id };
        })}
        rowSelection={rowSelection}
        loading={isLoading}
        scroll={{ y: 500 }}
      />
      <ProductManipulationModal
        isOpen={productManipulationModalProps.isOpen}
        type={productManipulationModalProps.type}
        //@ts-ignored
        cancel={handleToggleProductManipulationModal}
      ></ProductManipulationModal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onOk={handleDeleteProduct}
        onCancel={handleToggleDeleteModal}
      />
      <DetailModal
        product={detailInformationModalStatus.product}
        isOpen={detailInformationModalStatus.isOpen}
        handleOpenDetailModal={handleToggleDetailModal}
      />
    </div>
  );
};

export default ProductManagement;
