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
const UserManagement = () => {
  const listOfUser = [
    {
      id: 12313,
      name: "Son",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "2023-09-25",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 1,
    },
    {
      id: 123213,
      name: "Son1",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "28-09-2023",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 2,
    },
    {
      id: 123813,
      name: "Son2",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "2023-09-25",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 3,
    },
    {
      id: 1253213,
      name: "Son",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "2023-09-25",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 4,
    },
    {
      id: 113213,
      name: "Son",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "2023-09-25",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 5,
    },
    {
      id: 1232213,
      name: "Son",
      username: "son.ndc",
      age: "18",
      dateOfBirth: "2023-09-25",
      email: "son.ndc@yas.com.vn",
      address: "Phuc Tien District, Binh Yen",
      numOrder: 9,
      key: 6,
    },
  ];

  const [userManipulationModalProps, setUserManipulationModalProps] = useState({
    type: "",
    isOpen: false,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
      dataIndex: "no",
      key: "no",
      render: (text: string, record: Object, index: number) => {
        return index;
      },
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (text: string, record: Object, index: number) => {
        const t = dayjs();
        return (
          <Tooltip
            title={() => {
              return (
                <>{`Tuổi: ${dayjs(text, "YYYY-MM-DD").diff(t, "year")}`}</>
              );
            }}
          >
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
      render: () => {
        return (
          <div className={"list-btn"}>
            <div
              className={"edit btn"}
              role={"button"}
              onClick={() => {
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
        dataSource={listOfUser}
        // expandable={{
        //   expandedRowRender: (text, record, index) => <ProductTable />,
        // }}
        rowSelection={rowSelection}
      />
      <UserManipulationModal
        isOpen={userManipulationModalProps.isOpen}
        type={userManipulationModalProps.type}
        cancel={handleCancel}
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
