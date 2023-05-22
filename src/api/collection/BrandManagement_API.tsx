import { fetcher } from "../Fetcher";
import { IBrand } from "../../interface/brand-management/IBrand";

const endpoint = {
  getAllBrand: "/brands",
  updateBrand: "/brands/update",
  deleteBrand: "/brands/delete",
  createBrand: "/brands/add",
};
export function getAllBrand() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllBrand,
  });
}

export function createBrand(body: IBrand) {
  console.log(body)
  return fetcher(
    {
      method: "POST",
      url: endpoint.createBrand,
      data: body
    },
    "create"
  );
}

export function updateBrand(data: IBrand) {
  return fetcher(
    {
      method: "POST",
      url: `${endpoint.updateBrand}`,
      data: data,
    },
    "edit"
  );
}

export function deleteBrand(data: React.Key[]) {
  return fetcher(
    {
      method: "DELETE",
      url: `${endpoint.deleteBrand}`,
      data: data,
    },
    "delete"
  );
}
