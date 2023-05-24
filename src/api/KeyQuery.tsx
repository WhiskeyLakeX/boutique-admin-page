const USER_ADMIN = {
  LOGIN: "login_mutation",
  REGISTER: "register_mutation",
};

const USER_MANAGEMENT = {
  GET_LIST_USER: "get_list_user",
};

const PRODUCT_MANAGEMENT = {
  GET_LIST_PRODUCT: "get_list_product",
  DELETE_PRODUCT: "delete_product",
  CREATE_PRODUCT: "create_product",
};

const CATEGORY_MANAGEMENT = {
  GET_LIST_CATEGORY: "get_list_category",
  GET_CATEGORY_BY_ID: "get_category_by_id",
};
const ORDER_MANAGEMENT = {
  GET_LIST_ORDER: "get_list_order",
};

const BRAND_MANAGEMENT = {
  GET_LIST_BRAND: "get_list_brand",
  SEARCH_BRAND: "search_brand",
};

export {
  USER_ADMIN,
  USER_MANAGEMENT,
  PRODUCT_MANAGEMENT,
  CATEGORY_MANAGEMENT,
  ORDER_MANAGEMENT,
  BRAND_MANAGEMENT,
};
