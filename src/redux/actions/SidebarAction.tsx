import SidebarConstant from "../constants/SidebarConstant";

export default {
  sidebarOpen: () => ({
    type: SidebarConstant.SIDEBAR_OPEN,
  }),
  sidebarClose: () => ({
    type: SidebarConstant.SIDEBAR_CLOSE,
  }),
  sidebarToggle: () => ({
    type: SidebarConstant.SIDEBAR_TOGGLE,
  }),
};
