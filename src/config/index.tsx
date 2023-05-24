// NAME
const STORE_NAME = "state";

// NETWORK
export const NETWORK_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_ENDPOINT,
  BASE_URL: process.env.REACT_APP_BASE_URL,
  TIMEOUT: 30000,
  RETRY: false,
};

// PATHNAME
export const PATHNAME = {
  HOME: "/product-management",
  LOGIN: "/login",
};

// LANGUAGE
const LANGUAGE = {
  DEFAULT: "vi",
};

export default {
  STORE_NAME,
  NETWORK_CONFIG,
  PATHNAME,
  LANGUAGE,
};
