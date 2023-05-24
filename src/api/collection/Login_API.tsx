import { fetcher } from "../Fetcher";
import IUser, { IAdminAccount } from "../../interface/user-management/IUser";

const url = {
  login: "/user-auth/authenticate",
  register: "/user-register/register-admin",
};

export function login(body: { username: string; password: string }) {
  return fetcher(
    {
      url: url.login,
      data: body,
      method: "POST",
    },
    "login"
  );
}
export function registerAdminAccount(body: IAdminAccount | IUser) {
  return fetcher(
    {
      url: url.register,
      data: { ...body, role_id: 1 },
      method: "POST",
    },
    "register"
  );
}
