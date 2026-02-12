import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AddressSchemaType, addressSchema } from "../schemas/addresses";
import useCreateUpdateAddress from "../api/addresses/useCreateUpdateAddress";
import useGetAddress from "../api/addresses/useGetAddress";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const useCreateAddressLogic = () => {
  const { id } = useParams();

  const { isPending, mutateAsync } = useCreateUpdateAddress({ id });
  const { data: addressData, isLoading: isLoadingAddress } = useGetAddress({
    id,
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      type_id: 0,
      postcode: "",
      address: "",
      city_id: 0,
      country_id: 0,
    },
  });

  useEffect(() => {
    if (addressData && id) {
      setValue("name", addressData.name || "");
      setValue("type_id", addressData.type);
      setValue("postcode", addressData.postcode || "");
      setValue("address", addressData.address || "");
      setValue("city_id", addressData.city_id?.id || 0);
      setValue("country_id", addressData.country_id?.id || 0);
    }
  }, [addressData, id, setValue]);

  const onSubmit = async (data: AddressSchemaType) => {
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        console.log("response from create addreses", response);
        toast.success(response?.message);
        reset();
        navigate(searchParams.get("to") || "..");
      }
    } catch (error) {
      toastErrorMessage(error as Error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    isPending,
    onSubmit,
    watch,
    setValue,
    reset,
    isLoadingAddress,
  };
};

export default useCreateAddressLogic;
