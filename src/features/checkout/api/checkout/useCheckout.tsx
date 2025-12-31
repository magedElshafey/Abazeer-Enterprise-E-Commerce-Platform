// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Axios } from "@/lib/axios/Axios";
// import { apiRoutes } from "@/services/api-routes/apiRoutes";
// import { useNavigate } from "react-router-dom";
// const useCheckout = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   type CheckoutPayload = {
//     products: { product_id: number; quantity: number }[];
//     payment_type: string;
//     notes?: string;
//     address_id: number;
//   };

//   return useMutation({
//     mutationKey: [apiRoutes?.orders],
//     mutationFn: async (order: CheckoutPayload) => {
//       const { data } = await Axios.post(apiRoutes?.orders, order);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [apiRoutes?.cart],
//       });
//       navigate("/order-success");
//     },
//   });
// };

// export default useCheckout;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export type CheckoutPayload = {
  products: { product_id: number; quantity: number }[];
  payment_type: "cash_on_delivery" | "online" | string;
  notes?: string;
  address_id: number;
  coupon_code?: string;
};

export type CheckoutResponse = {
  status: boolean;
  message?: string;
  id?: number; // مهم عشان online flow
  data?: {
    id?: number;
  };
};

const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckoutResponse, unknown, CheckoutPayload>({
    mutationKey: [apiRoutes.orders],
    mutationFn: async (payload) => {
      const { data } = await Axios.post(apiRoutes.orders, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
    },
  });
};

export default useCheckout;
