import { combineReducers } from "redux";
import sidebarReducer from "./sidebarReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  sidebarReducer,
  userReducer,
});

export default rootReducer;
