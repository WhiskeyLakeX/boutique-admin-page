import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { useQuery } from "react-query";
import { CATEGORY_MANAGEMENT } from "../../api/KeyQuery";
import { getAllCategory } from "../../api/collection/CategoryManagement_API";
import { EditActionBtn } from "../../module/component/Button/ActionBtn/ActionButton";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalBtn from "../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ICategory } from "../../interface/category-management/CategoryInterface";
import CategoryManipulationModal from "./modal/CategoryManipulationModal";

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

  const handleToggleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ICategory>();
  const {
    data: listOfCategory,
    isLoading,
    refetch,
  } = useQuery(CATEGORY_MANAGEMENT.GET_LIST_CATEGORY, getAllCategory);
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
      title: "Tên danh mục",
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
      render: (text: string, record: ICategory, index: number) => {
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
      <CategoryManipulationModal
        isOpen={manipulationModalProps.isOpen}
        type={manipulationModalProps.type}
        cancel={handleToggleManipulationModal}
        refetch={refetch}
        selectedRecord={selectedRecord}
      />
    </div>
  );
};

export default CategoryManagement;
