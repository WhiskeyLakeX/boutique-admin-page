import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { useMutation, useQuery } from "react-query";
import { EditActionBtn } from "../../module/component/Button/ActionBtn/ActionButton";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { DeleteModal } from "../../module/component/Modal";
import { BRAND_MANAGEMENT } from "../../api/KeyQuery";
import { IBrand } from "../../interface/brand-management/IBrand";
import {
  deleteBrand,
  getAllBrand,
} from "../../api/collection/BrandManagement_API";
import BrandManipulationModal from "./modal/BrandManipulationModal";

const CategoryManagement = () => {
  const [manipulationModalProps, setManipulationModalProps] = useState({
    type: "",
    isOpen: false,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const handleToggleManipulationModal = (type?: string) => {
    setManipulationModalProps({
      type: type ? type : "",
      isOpen: !manipulationModalProps.isOpen,
    });
  };
  const deleteMutation = useMutation(deleteBrand);
  const handleToggleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<IBrand>();
  const {
    data: listOfCategory,
    isLoading,
    refetch,
  } = useQuery(BRAND_MANAGEMENT.GET_LIST_BRAND, getAllBrand);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const categoryTableColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
      width: 70,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "numberOfProduct",
      key: "numberOfProduct",
      width: 100,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (text: string, record: IBrand, index: number) => {
        return (
          <div className={"list-btn"}>
            <EditActionBtn
              onClickFunction={() => {
                setSelectedRecord(record);
                handleToggleManipulationModal("edit");
              }}
            />
          </div>
        );
      },
      width: 100,
    },
  ];

  return (
    <div className="management-antd-table-container">
      <div className="utils-bar">
        <Tooltip title={"Từ khoá: Tên danh mục"} placement={"topLeft"}>
          <GlobalInputSearch />
        </Tooltip>
        <div className={"action-btn"}>
          <GlobalBtn
            icon={<FontAwesomeIcon className="icon" icon={solid("plus")} />}
            onClick={() => handleToggleManipulationModal("create")}
          >
            Đăng ký danh mục
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
        columns={categoryTableColumns}
        //@ts-ignore
        dataSource={listOfCategory?.data?.data.map((item) => {
          return { ...item, key: item.id };
        })}
        rowSelection={rowSelection}
        loading={isLoading}
      />
      <BrandManipulationModal
        isOpen={manipulationModalProps.isOpen}
        type={manipulationModalProps.type}
        cancel={handleToggleManipulationModal}
        refetch={refetch}
        selectedRecord={selectedRecord}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onOk={() => {
          deleteMutation.mutate(selectedRowKeys, {
            onSuccess: () => refetch(),
          });
        }}
        onCancel={handleToggleDeleteModal}
      />
    </div>
  );
};

export default CategoryManagement;
