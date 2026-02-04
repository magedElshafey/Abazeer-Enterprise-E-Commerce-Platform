import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline, MdLocationOn } from "react-icons/md";
import { FaMapMarkedAlt, FaCity } from "react-icons/fa";
import { BsMailbox } from "react-icons/bs";
import { IoLocationSharp, IoArrowBack } from "react-icons/io5";
import MainInput from "@/common/components/inputs/MainInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import MainBtn from "@/common/components/buttons/MainBtn";
import useCreateAddressLogic from "../../logic/useCreateAddressLogic";
import useGetCountries from "@/common/api/hooks/useGetCountries";
import useGetCities from "@/common/api/hooks/useGetCities";
import { ADDRESS_TYPE_OPTIONS } from "../../constants/address.constants";

interface AddressFormProps {
  readonly?: boolean;
}

const AddressForm: FC<AddressFormProps> = ({ readonly = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    errors,
    register,
    onSubmit,
    handleSubmit,
    isPending,
    watch,
    setValue,
    isLoadingAddress,
  } = useCreateAddressLogic();

  // Fetch countries
  const { data: countries = [], isLoading: isLoadingCountries } =
    useGetCountries();

  // Watch country_id to enable city fetching
  const selectedCountryId = watch("country_id");

  // Fetch cities based on selected country
  const { data: cities = [], isLoading: isLoadingCities } = useGetCities({
    countryId: selectedCountryId,
  });

  // Show loading state while fetching address data
  if (isLoadingAddress) {
    return (
      <div className="w-full">
        <div className="p-6 bg-white border rounded-lg shadow-md md:p-8">
          <div className="animate-pulse">
            <div className="w-1/3 h-8 mb-6 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-6 bg-white border rounded-lg shadow-md md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
          {t(id ? "update_address" : "create_address")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Address Name */}
            <div>
              <MainInput
                required={!readonly}
                Icon={MdOutlineDriveFileRenameOutline}
                placeholder="address name"
                label="address name"
                {...register("name")}
                error={errors.name?.message}
                type="text"
                disabled={readonly}
              />
            </div>

            {/* Address Type */}
            <div>
              <MainSelect
                required={!readonly}
                Icon={IoLocationSharp}
                label="address type"
                placeholder="address type"
                options={ADDRESS_TYPE_OPTIONS}
                value={watch("type_id") || null}
                onChange={(value) => setValue("type_id", value || 0)}
                error={errors.type_id?.message}
                disabled={readonly}
              />
            </div>

            {/* Country */}
            <div>
              <MainSelect
                required={!readonly}
                Icon={FaMapMarkedAlt}
                label="country"
                placeholder="country"
                options={countries}
                value={watch("country_id") || null}
                onChange={(value) => {
                  setValue("country_id", value || 0);
                  setValue("city_id", 0);
                }}
                loading={isLoadingCountries}
                error={errors.country_id?.message}
                disabled={readonly}
              />
            </div>

            {/* City */}
            <div>
              <MainSelect
                required={!readonly}
                Icon={FaCity}
                label="city"
                placeholder="city"
                options={cities}
                value={watch("city_id") || null}
                onChange={(value) => setValue("city_id", value || 0)}
                loading={isLoadingCities}
                disabled={readonly || !selectedCountryId}
                error={errors.city_id?.message}
              />
            </div>

            {/* Address - Full Width */}
            <div className="lg:col-span-2">
              <MainInput
                required={!readonly}
                Icon={MdLocationOn}
                placeholder="address"
                label="address"
                {...register("address")}
                error={errors.address?.message}
                type="text"
                disabled={readonly}
              />
            </div>

            {/* Postal Code */}
            <div>
              <MainInput
                Icon={BsMailbox}
                placeholder="postal code"
                label="postal code"
                {...register("postcode")}
                error={errors.postcode?.message}
                type="text"
                disabled={readonly}
                required
              />
            </div>
          </div>

          {/* Action Buttons - Only show when not readonly */}
          {!readonly && (
            <div className="w-full pt-6 flex-center">
              <div className="flex w-full max-w-md gap-4">
                <MainBtn
                  type="submit"
                  className="flex-1 flex-center"
                  text="save address"
                  isPending={isPending}
                />
                <MainBtn
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 flex-center"
                  text="back"
                  theme="outline"
                >
                  <IoArrowBack size={18} />
                </MainBtn>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
