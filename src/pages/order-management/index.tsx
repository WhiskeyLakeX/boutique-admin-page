import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  changeOrderStatus,
  getAllOrder,
} from "../../api/collection/OrderManagerment_API";
import { ORDER_MANAGEMENT } from "../../api/KeyQuery";
import { Switch, Table, Tooltip } from "antd";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import DetailModal from "./detail-modal/DetailModal";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const OrderManagement = () => {
  const [detailInformationModalStatus, setDetailInformationModalStatus] =
    useState<{
      isOpen: boolean;
      cart_id: number | null;
    }>({
      isOpen: false,
      cart_id: -1,
    });
  const [arrStatus, setArrStatus] = useState<
    { cart_id: number; cart_status: boolean }[]
  >([]);
  const [idLoadingStatus, setIdLoadingStatus] = useState<number>();
  const listOfOrder = useQuery(ORDER_MANAGEMENT.GET_LIST_ORDER, getAllOrder);
  const handleToggleDetailModal = (
    cart_id: number,
    type: "open" | "cancel"
  ) => {
    setDetailInformationModalStatus({
      cart_id: type === "open" ? cart_id : null,
      isOpen: !detailInformationModalStatus.isOpen,
    });
  };

  const orderStatusMutation = useMutation(changeOrderStatus);

  const handleChangeStatus = (
    checked: boolean,
    index: number,
    id: number
  ): void => {
    const arrStatusTmp = arrStatus;
    setIdLoadingStatus(id);
    orderStatusMutation.mutate(
      {
        cart_id: id,
        cart_status: checked === true ? 2 : 1,
      },
      {
        onSuccess: () => {
          arrStatusTmp[index] = {
            ...arrStatusTmp[index],
            cart_status: checked,
          };
          setArrStatus(arrStatusTmp);
          listOfOrder.refetch();
        },
      }
    );
  };

  useEffect(() => {
    const arrStatusTmp: { cart_id: number; cart_status: boolean }[] = [];
    // @ts-ignore
    listOfOrder?.data?.data?.data?.map(
      (item: { cart_id: any; cart_status: number }) => {
        arrStatusTmp.push({
          cart_id: item.cart_id ?? -1,
          cart_status: item.cart_status === 2,
        });
      }
    );
    setArrStatus(arrStatusTmp);
    // @ts-ignore
  }, [listOfOrder?.data?.data?.data]);

  const orderTableColumn = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
      width: 65,
    },
    {
      title: "ID đơn hàng",
      dataIndex: "cart_id",
      key: "cart_id",
      width: 100,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ordered_at",
      key: "ordered_at",
      width: 100,
      render: (item: any, record: any, index: any) => {
        return item ? item : "-";
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "hasPaid",
      key: "hasPaid",
      width: 120,
      render: (item: boolean, record: any, index: any) => {
        return item === false ? "Chưa thanh toán" : "Đã thanh toán";
      },
    },
    {
      title: "Người tạo",
      key: "fullname",
      dataIndex: ["user", "fullname"],
      render: (item: any) => {
        return <>{item ? item : "-"}</>;
      },
      width: 100,
    },
    {
      title: "Ngày sinh",
      key: "dob",
      dataIndex: ["user", "dob"],
      render: (item: any) => {
        return <>{item ? item : "-"}</>;
      },
      width: 100,
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      dataIndex: ["user", "phone_number"],
      render: (item: any) => {
        return <>{item ? item : "-"}</>;
      },
      width: 130,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: ["user", "email"],
      render: (item: any) => {
        return <>{item ? item : "-"}</>;
      },
      width: 150,
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (item: any) => {
        return <>{item?.unit_price ? item?.unit_price : "-"}</>;
      },
      width: 100,
    },

    {
      title: "Trạng thái đơn hàng",
      dataIndex: "cart_status",
      key: "cart_status",
      width: 100,
      render: (text: number) => {
        return text === 1 ? "Chưa duyệt" : "Đã duyệt";
      },
    },
    {
      title: "Ngày duyệt",
      dataIndex: "completed_at",
      key: "completed_at",
      width: 120,
      render: (text: string) => {
        return <>{text ?? "-"}</>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (
        text: any,
        record: { cart_id: number; cart_status: number },
        index: any
      ) => {
        return (
          <Tooltip
            title={
              record.cart_status === 1
                ? "Cập nhật trạng thái đơn hàng"
                : "Đơn hàng đã được phê duyệt"
            }
          >
            <Switch
              disabled={record.cart_status === 2}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={arrStatus[index]?.cart_status}
              onChange={(checked): void =>
                handleChangeStatus(checked, index, record.cart_id)
              }
              loading={
                orderStatusMutation.isLoading &&
                idLoadingStatus === record.cart_id
              }
            />
          </Tooltip>
        );
      },
      width: 120,
    },
  ];
  console.log("Loading", orderStatusMutation.error);
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
        scroll={{ y: 500, x: 1000 }}
        onChange={(pagination, filters, sorter, extra) => {
          console.log("Pagination", pagination);
        }}
      />
      <DetailModal
        isOpen={detailInformationModalStatus.isOpen}
        handleOpenDetailModal={handleToggleDetailModal}
      />
    </div>
  );
};

export default OrderManagement;
