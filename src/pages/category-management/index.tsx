import React from "react";
import { Table, Tooltip } from "antd";
import { TableRowWidth } from "../../config/TableRowWidth";
import { IProduct } from "../../interface/product-management/ProductInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useQuery } from "react-query";
import { CATEGORY_MANAGEMENT } from "../../api/KeyQuery";
import { getAllCategory } from "../../api/collection/CategoryManagement_API";
import { EditActionBtn } from "../../module/component/Button/ActionBtn/ActionButton";

const CategoryManagement = () => {
  const {
    data: listOfCategory,
    isLoading,
    refetch,
  } = useQuery(CATEGORY_MANAGEMENT.GET_LIST_CATEGORY, getAllCategory);

  const categoryTableColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
      width: 10,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 10,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: TableRowWidth.category,
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "numberOfProduct",
      key: "numberOfProduct",
      width: TableRowWidth.category,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (text: string, record: IProduct, index: number) => {
        return (
          <div className={"list-btn"}>
            <EditActionBtn />
          </div>
        );
      },
      width: TableRowWidth.actionCol,
    },
  ];

  return (
    <Table
      className="management-table mt-12"
      columns={categoryTableColumns}
      //@ts-ignore
      dataSource={listOfCategory?.data?.data.map((item) => {
        return { ...item, key: item.id };
      })}
      // rowSelection={rowSelection}
      loading={isLoading}
      // scroll={{ y: 500, x: 700 }}
    />
  );
};

export default CategoryManagement;
