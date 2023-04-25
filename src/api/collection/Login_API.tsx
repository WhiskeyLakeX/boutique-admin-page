import { fetcher } from "../Fetcher";
import { IAdminAccount } from "../../interface/user-management/IUser";

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
export function registerAdminAccount(body: IAdminAccount) {
  return fetcher(
    {
      url: url.register,
      data: body,
      method: "POST",
    },
    "register"
  );
}
