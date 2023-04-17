import { fetcher } from "../Fetcher";
import { ICategory } from "../../interface/category-management/CategoryInterface";

const endpoint = {
  getAllCategory: "/categories",
  updateCategory: "/category/update",
  deleteCategory: "/categories/delete",
  createCategory: "/categories/create",
};
export function getAllCategory() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllCategory,
  });
}

export function createCategory(data: ICategory) {
  return fetcher(
    {
      method: "POST",
      url: endpoint.createCategory,
      data: data,
    },
    "create"
  );
}

export function updateCategory(data: ICategory) {
  // console.log(data);
  return fetcher(
    {
      method: "PUT",
      url: endpoint.updateCategory,
      data: data,
      params: data.id,
    },
    "edit"
  );
}
