import { fetcher } from "../Fetcher";
import React from "react";
import IUser, { IAdminAccount } from "../../interface/user-management/IUser";

const url = {
  getAllUser: "/users",
  createUser: "/user-register/register",
  deleteUser: "/users/delete",
  updateUser: "/user/update",
};

export function getAllUser() {
  return fetcher({ url: url.getAllUser, method: "GET" });
}

export function createUser(body: IUser | IAdminAccount) {
  return fetcher(
    {
      url: url.createUser,
      method: "POST",
      data: {
        ...body,
        role_id: 0,
      },
    },
    "create"
  );
}

export function editUser(body: IUser | IAdminAccount) {
  return fetcher(
    {
      url: url.updateUser,
      method: "POST",
      data: body,
    },
    "edit"
  );
}
export function deleteUser(body: React.Key[]) {
  return fetcher(
    {
      url: url.deleteUser,
      method: "DELETE",
      data: body,
    },
    "delete"
  );
}
