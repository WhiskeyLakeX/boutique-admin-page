import { fetcher } from "../Fetcher";

const endpoint = {
  getAllBrand: "/brand",
  updateBrand: "/brand/update",
  deleteBrand: "/brand/delete",
  createBrand: "/brand/create",
  getById: "/categories",
};
export function getAllBrand() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllBrand,
  });
}
