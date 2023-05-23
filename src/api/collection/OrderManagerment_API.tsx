import { fetcher } from "../Fetcher";

const endpoint = {
  getAllOrder: "/cart_lines",
};
export function getAllOrder() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllOrder,
  });
}

// export function createBrand(body: IBrand) {
//   return fetcher(
//     {
//       method: "POST",
//       url: endpoint.createBrand,
//     },
//     "create"
//   );
// }
//
// export function updateBrand(data: IBrand) {
//   return fetcher(
//     {
//       method: "POST",
//       url: `${endpoint.updateBrand}`,
//       data: data,
//     },
//     "edit"
//   );
// }
//
// export function deleteBrand(data: React.Key[]) {
//   return fetcher(
//     {
//       method: "DELETE",
//       url: `${endpoint.deleteBrand}`,
//       data: data,
//     },
//     "delete"
//   );
// }
