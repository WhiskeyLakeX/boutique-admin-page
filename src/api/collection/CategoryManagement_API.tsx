import { fetcher } from "../Fetcher";

const endpoint = {
  getAllCategory: "/categories",
  editCategory: "/category-edit",
  deleteCategory: "/category-delete",
};
export function getAllCategory() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllCategory,
  });
}
