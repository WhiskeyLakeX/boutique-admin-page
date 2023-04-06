import UserConstant from "../constants/UserConstant";

interface IUserInfo {
  accessToken: string;
  role: number;
  username: string;
}

const initialState = {
  accessToken: "",
  role: "",
};
//Take current state and action to return state
//(state, action) => newState
export default function User(
  state = initialState,
  action: { type: any; payload: IUserInfo }
) {
  switch (action.type) {
    case UserConstant.USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case UserConstant.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
