import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllOrder } from "../../api/collection/OrderManagerment_API";
import { ORDER_MANAGEMENT } from "../../api/KeyQuery";
import { Table, Tooltip } from "antd";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";

const OrderManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const listOfOrder = useQuery(ORDER_MANAGEMENT.GET_LIST_ORDER, getAllOrder);
  const orderTableColumn = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
      width: 50,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "cart_id",
      key: "cart_id",
      width: 100,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "product",
      width: 150,
      render: (text: string) => {
        return <>{text ?? "-"}</>;
      },
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (item: any) => {
        return <>{item?.unit_price}</>;
      },
      width: 100,
    },
    {
      title: "Giá tiền (VND)",
      dataIndex: "unit_price",
      key: "unit_price",
      width: 100,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (text: string) => {
        return (
          <div className={"list-btn"}>
            {/*<DetailedInfoActionBtn*/}
            {/*  onClickFunction={() => {*/}
            {/*    handleToggleDetailModal(record, "open");*/}
            {/*  }}*/}
            {/*/>*/}
          </div>
        );
      },
      width: 70,
    },
  ];
  return (
    <div className="management-antd-table-container">
      <div className="utils-bar">
        <Tooltip title={"Từ khoá: ID đơn hàng"} placement={"topLeft"}>
          <GlobalInputSearch />
        </Tooltip>
      </div>
      <Table
        className="management-table mt-12"
        columns={orderTableColumn}
        //@ts-ignore
        dataSource={listOfOrder?.data?.data?.data?.map((item) => {
          return { ...item, key: item.id };
        })}
        loading={listOfOrder.isLoading}
        scroll={{ y: 500 }}
        onChange={(pagination, filters, sorter, extra) => {
          console.log("Pagination", pagination);
        }}
      />
      {/*<DetailModal*/}
      {/*  product={detailInformationModalStatus.product}*/}
      {/*  isOpen={detailInformationModalStatus.isOpen}*/}
      {/*  handleOpenDetailModal={handleToggleDetailModal}*/}
      {/*/>*/}
    </div>
  );
};

export default OrderManagement;
