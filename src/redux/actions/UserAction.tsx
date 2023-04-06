import UserConstant from "../constants/UserConstant";

interface IUser {
  accessToken: string;
  role: number;
  username: string;
}

export default {
  userLogin: (payload: IUser) => ({
    type: UserConstant.USER_LOGIN,
    payload,
  }),
  userLogout: () => ({
    type: UserConstant.USER_LOGOUT,
  }),
};
