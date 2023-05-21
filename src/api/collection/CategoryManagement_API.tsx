import { fetcher } from "../Fetcher";
import { ICategory } from "../../interface/category-management/CategoryInterface";

const endpoint = {
  getAllCategory: "/categories",
  updateCategory: "/categories/update",
  deleteCategory: "/categories/delete",
  createCategory: "/categories/create",
  getById: "/categories",
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
  return fetcher(
    {
      method: "PUT",
      url: `${endpoint.updateCategory}/${data.id}`,
      data: data,
    },
    "edit"
  );
}

export function getCategoryById(data: number) {
  return fetcher({
    method: "GET",
    url: `${endpoint.getById}/${data}`,
    params: data,
  });
}

export function deleteCategory(data: number[]) {
  return fetcher({
    method: "DELETE",
    url: endpoint.deleteCategory,
  });
}
