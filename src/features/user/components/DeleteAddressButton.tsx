import { FC } from "react";
import { useTranslation } from "react-i18next";
import DialogComponent from "@/common/components/dialog/dialog";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { MdDelete } from "react-icons/md";
interface DeleteAddressButtonProps {
  addressId: number;
  addressName?: string;
  onSuccess?: () => void;
}

const DeleteAddressButton: FC<DeleteAddressButtonProps> = ({
  addressId,
  addressName,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const handleDelete = async () => {
    const response = await Axios.delete(`${apiRoutes.addresses}/${addressId}`);

    return response;
  };

  return (
    <DialogComponent
      header={{
        title: "remove",
      }}
      content={
        <div className="py-4 space-y-3">
          <p className="text-gray-700">
            {addressName
              ? t("delete_address_named_confirmation", { name: addressName })
              : t("delete_address_confirmation")}
          </p>
          <p className="text-sm text-gray-600">
            {t("This action cannot be undone.")}
          </p>
        </div>
      }
      action={{
        action: handleDelete,
        text: "remove",
      }}
      cancel={{
        text: "Cancel",
      }}
      queryKey={[apiRoutes.addresses]}
      type="danger"
      onSuccess={onSuccess}
    >
      <button
        className="flex items-center gap-2 px-3 py-2 text-red-600 transition-colors duration-200 rounded-lg hover:text-red-700 hover:bg-red-50"
        aria-label={t("remove")}
      >
        <MdDelete size={20} />
        <span className="font-medium">{t("remove")}</span>
      </button>
    </DialogComponent>
  );
};

export default DeleteAddressButton;
