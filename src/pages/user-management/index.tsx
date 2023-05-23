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

const UserManagement = () => {
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
      title: "Số đơn",
      dataIndex: "numOrder",
      key: "numOrder",
      sorter: true,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: true,
      render: (record: React.SetStateAction<undefined>) => {
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
            <div
              className={"delete btn"}
              role={"button"}
              onClick={handleOpenDeleteModal}
            >
              <FontAwesomeIcon icon={solid("trash")} />
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
            Đăng ký người dùng
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
        //@ts-ignore
        dataSource={listOfUser?.data?.data.map((item) => {
          return { ...item, key: item.user_id };
        })}
        rowSelection={rowSelection}
        loading={isLoading}
      />
      <UserManipulationModal
        isOpen={userManipulationModalProps.isOpen}
        type={userManipulationModalProps.type}
        cancel={handleCancel}
        selectedRecord={selectedRecord}
      ></UserManipulationModal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={handleOpenDeleteModal}
        onOk={() => {}}
      />
    </div>
  );
};

export default UserManagement;
