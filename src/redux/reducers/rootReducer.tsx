import { combineReducers } from "redux";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
  sidebarReducer,
});

export default rootReducer;
