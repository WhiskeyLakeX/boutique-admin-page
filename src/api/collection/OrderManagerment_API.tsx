import { fetcher } from "../Fetcher";

const endpoint = {
  getAllOrder: "/cart/all",
  changeOrderStatus: "/cart/set_status",
};
export function getAllOrder() {
  return fetcher({
    method: "GET",
    url: endpoint.getAllOrder,
  });
}

export function changeOrderStatus(body: {
  cart_id: number | null;
  cart_status: number;
}) {
  return fetcher(
    {
      method: "POST",
      url: endpoint.changeOrderStatus,
      params: body,
    },
    "edit"
  );
}
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
