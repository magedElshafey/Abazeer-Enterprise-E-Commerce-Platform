import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";

const PriceDetails = ({ coast = "0" }: { coast: string }) => {
  const { t } = useTranslation();
  const {
    total,
    tax,

    subtotal,
    couponCode,
    discount_amount,
    cartQuery: { isFetching },
  } = useCart();

  const { data: settings } = useGetWebsiteSettings();
  return (
    <dl className={`text-gray-700 ${isFetching ? "opacity-40" : ""}`}>
      <div className="mb-2 flex-between">
        <dt>{t("subtotal")}</dt>
        <dd className="flex items-center">
          <p> {subtotal.toFixed(2)}</p> <SaudiCurrency />
        </dd>
      </div>
      {couponCode?.value && !!Number(discount_amount) && (
        <div className="mb-2 font-medium text-green-600 flex-between">
          <dt>{t("discount")}</dt>
          <dd className="flex items-center">
            <p> - {Number(discount_amount).toFixed(2)}</p> <SaudiCurrency />
          </dd>
        </div>
      )}
      <div className="mb-2 flex-between">
        <dt>{`${t("tax")} ${parseFloat(settings?.tax_rate || "0") * 100}%`}</dt>
        <dd className="flex items-center">
          <span>{Number(tax).toFixed(2)}</span>
          <SaudiCurrency />
        </dd>
      </div>
      <div className="mb-2 flex-between">
        <dt>{t("shipping fee")}</dt>
        <dd className="flex items-center">
          <p>{Number(coast).toFixed(2)}</p> <SaudiCurrency />
        </dd>
      </div>
      <div className="font-semibold flex-between">
        <dt>{t("Total")}</dt>
        <dd className="flex items-center">
          <p>{total}</p> <SaudiCurrency />
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetails;
