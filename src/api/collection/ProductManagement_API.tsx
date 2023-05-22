import { fetcher } from "../Fetcher";
import React from "react";
import { IProduct } from "../../interface/product-management/ProductInterface";

const url = {
  getAllProduct: "/products",
  createProduct: "/products/add",
  deleteProduct: "/products/delete",
  updateProduct: "/products/update",
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

export function updateProduct(body: IProduct) {
  return fetcher(
    {
      url: url.updateProduct,
      method: "POST",
      data: body,
    },
    "edit"
  );
}

export function deleteProduct(body: React.Key[]) {
  console.log(body);
  return fetcher(
    {
      url: url.deleteProduct,
      method: "DELETE",
      data: body,
    },
    "delete"
  );
}
