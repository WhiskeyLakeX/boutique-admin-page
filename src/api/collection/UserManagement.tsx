import { fetcher } from "../Fetcher";
import React from "react";
import IUser from "../../interface/user-management/IUser";

const url = {
  getAllUser: "/users",
  createUser: "/users/add",
  deleteUser: "/users/delete",
};

export function getAllUser() {
  return fetcher({ url: url.getAllUser, method: "GET" });
}

export function createUser(body: IUser) {
  return fetcher(
    {
      url: url.createUser,
      method: "POST",
      data: body,
    },
    "create"
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
