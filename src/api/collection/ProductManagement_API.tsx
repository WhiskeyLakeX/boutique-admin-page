import React from "react";
import { fetcher } from "../Fetcher";

const url = {
  getAllProduct: "/products",
};

export function getAllProduct() {
  return fetcher({ url: url.getAllProduct, method: "GET" });
}
