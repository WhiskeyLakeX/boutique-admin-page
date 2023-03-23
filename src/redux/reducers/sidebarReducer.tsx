import SidebarConstant from "../constants/SidebarConstant";

interface IAction {
  type: string;
}

const initialState = {
  isOpen: false,
};
export default function Sidebar(state = initialState, action: IAction) {
  switch (action.type) {
    case SidebarConstant.SIDEBAR_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case SidebarConstant.SIDEBAR_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case SidebarConstant.SIDEBAR_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
