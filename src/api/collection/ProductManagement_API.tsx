import { fetcher } from "../Fetcher";
import React from "react";
import { IProduct } from "../../interface/product-management/ProductInterface";

const url = {
  getAllProduct: "/products",
  createProduct: "/products/add",
  deleteProduct: "/products/delete",
};

export function getAllProduct() {
  return fetcher({ url: url.getAllProduct, method: "GET" });
}

export function createProduct(body: IProduct) {
  return fetcher(
    {
      url: url.createProduct,
      method: "POST",
      data: body,
    },
    "create"
  );
}

export function deleteProduct(body: React.Key[]) {
  return fetcher(
    {
      url: url.deleteProduct,
      method: "DELETE",
      data: body,
    },
    "delete"
  );
}
