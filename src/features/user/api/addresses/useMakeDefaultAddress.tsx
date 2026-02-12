import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";

const useMakeDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["makeDefaultAddress"],
    mutationFn: async (addressId: number) => {
      const { data } = await Axios.patch<Response>(
        `${apiRoutes.addresses}/${addressId}/set-default`,
      );
      return data;
    },
    onSuccess: async (data) => {
      // toast message from API response
      if (data?.message) toast.success(data.message);
      // refresh addresses list
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.addresses] });
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.getDeliveryFees, (data?.data as { id?: number })?.id],
      });
    },
    onError: (error: Error) => {
      toastErrorMessage(error);
    },
  });
};

export default useMakeDefaultAddress;
