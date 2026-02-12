import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
const useGetShippingMethod = (id: number | string) => {
  return useQuery({
    queryKey: [apiRoutes?.getDeliveryFees, id],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.getDeliveryFees}/${id}`);
      console.log("data from fees");
      return data?.data;
    },
    enabled: !!id,
  });
};

export default useGetShippingMethod;
