import { fetcher } from "../Fetcher";

const url = {
  login: "/login",
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
