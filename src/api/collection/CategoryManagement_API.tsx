import { fetcher } from "../Fetcher";
import { ICategory } from "../../interface/category-management/CategoryInterface";

const endpoint = {
  getAllCategory: "/categories",
  editCategory: "/category-edit",
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
