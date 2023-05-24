import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import "./styles.scss";
import GlobalBtn from "../../module/component/Button/GlobalAnt-Btn/GlobalBtn";
import { GlobalInputSearch } from "../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserManipulationModal from "./modal/UserManipulationModal";
import dayjs from "dayjs";
import { DeleteModal } from "../../module/component/Modal";
import { useQuery } from "react-query";
import { USER_MANAGEMENT } from "../../api/KeyQuery";
import { getAllUser } from "../../api/collection/UserManagement";

interface IUserManagement {
  typeOfScreen?: string;
}

const UserManagement = ({ typeOfScreen }: IUserManagement) => {
  const {
    data: listOfUser,
    isLoading,
    refetch,
  } = useQuery(USER_MANAGEMENT.GET_LIST_USER, getAllUser);

  const [userManipulationModalProps, setUserManipulationModalProps] = useState({
    type: "",
    isOpen: false,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRecord, setSelectedRecord] = useState();

  const handleOpenUserManipulationModal = (type: string) => {
    setUserManipulationModalProps({
      type: type,
      isOpen: !userManipulationModalProps.isOpen,
    });
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const handleCancel = () => {
    setUserManipulationModalProps({
      ...userManipulationModalProps,
      isOpen: !userManipulationModalProps.isOpen,
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const UserTableColumn = [
    {
      title: "No.",
      dataIndex: "user_id",
      key: "user_id",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text: number) => {
        return text === 1 || typeof text === "string" ? "Nam" : "Nữ";
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      render: (text: string) => {
        const t = dayjs();
        return (
          <Tooltip
            title={() => {
              return (
                <>{`Tuổi: ${t.diff(dayjs(text, "YYYY-MM-DD"), "year")}`}</>
              );
            }}
          >
            {text ?? "-"}
          </Tooltip>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => {
        return <>{text ?? "-"}</>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text: string) => {
        return <>{text ?? "-"}</>;
      },
    },
    {
      title: typeOfScreen === "admin" ? "Quyền hạn" : "Số đơn",
      dataIndex: typeOfScreen === "admin" ? "role_id" : "numOrder",
      key: typeOfScreen === "admin" ? "role_id" : "numOrder",
      sorter: typeOfScreen !== "admin",
      render: (text: number, record: any, index: any) => {
        return text === 1 || !!text ? "Admin" : "Người dùng";
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (text: any, record: any) => {
        return (
          <div className={"list-btn"}>
            <div
              className={"edit btn"}
              role={"button"}
              onClick={() => {
                setSelectedRecord(record);
                handleOpenUserManipulationModal("edit");
              }}
            >
              <FontAwesomeIcon icon={solid("pen-to-square")} />
            </div>
          </div>
        );
      },
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
            onClick={() => handleOpenUserManipulationModal("create")}
          >
            Đăng ký tài khoản{" "}
            {typeOfScreen === "admin" ? "Admin" : "người dùng"}
          </GlobalBtn>
          <GlobalBtn
            icon={
              <FontAwesomeIcon className="icon" icon={regular("trash-can")} />
            }
            danger
            disabled={selectedRowKeys.length === 0}
            onClick={handleOpenDeleteModal}
          >
            Xoá
          </GlobalBtn>
        </div>
      </div>
      <Table
        className="management-table mt-12"
        columns={UserTableColumn}
        dataSource={
          typeOfScreen === "admin"
            ? //@ts-ignore
              listOfUser?.data?.data.map((item: { user_id: any }) => {
                return { ...item, key: item.user_id };
              })
            : //@ts-ignore
              listOfUser?.data?.data
                ?.filter((obj: { role: number }) => obj.role === 1)
                .map((item: { user_id: any }) => {
                  return { ...item, key: item.user_id };
                })
        }
        rowSelection={rowSelection}
        loading={isLoading}
      />
      <UserManipulationModal
        isOpen={userManipulationModalProps.isOpen}
        type={userManipulationModalProps.type}
        cancel={handleCancel}
        selectedRecord={selectedRecord}
        refetch={refetch}
        typeOfScreen={typeOfScreen}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={handleOpenDeleteModal}
        onOk={() => {}}
      />
    </div>
  );
};

export default UserManagement;
