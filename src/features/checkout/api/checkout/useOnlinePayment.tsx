// import { useMutation } from "@tanstack/react-query";
// import { Axios } from "@/lib/axios/Axios";
// import { apiRoutes } from "@/services/api-routes/apiRoutes";
// const useOnlinePayment = () => {
//   return useMutation({
//     mutationKey: [apiRoutes?.onlinePayment],
//     mutationFn: async (order_id: number) => {
//       const { data } = await Axios.post(apiRoutes?.onlinePayment, { order_id });
//       return data;
//     },
//   });
// };

// export default useOnlinePayment;
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export type OnlinePaymentResponse = {
  status: boolean;
  message?: string;
  url?: string; // بعض الباك بيرجّعها كده
  payment_url?: string; // وبعضهم كده
  data?: {
    url?: string;
    payment_url?: string;
  };
};

const useOnlinePayment = () => {
  return useMutation<OnlinePaymentResponse, unknown, number>({
    mutationKey: [apiRoutes.onlinePayment],
    mutationFn: async (order_id: number) => {
      const { data } = await Axios.post(apiRoutes.onlinePayment, { order_id });
      console.log("data from online payment", data);
      return data;
    },
  });
};

export default useOnlinePayment;
