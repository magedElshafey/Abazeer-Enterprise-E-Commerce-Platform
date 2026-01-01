import { useTranslation } from "react-i18next";
import { Payment } from "../../types/payment.type";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
interface PaymentMethodsProps {
  method: Payment;
  setMethod: React.Dispatch<React.SetStateAction<Payment>>;
  paymentMethods: Payment[];
}
const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  method,
  setMethod,
  paymentMethods,
}) => {
  const { t } = useTranslation();
  const query = useGetWebsiteSettings();
  console.log("q", query?.data);
  const hasCod = query?.data?.payment_cod;
  const filterWithoutCOD = paymentMethods?.filter(
    (item) => item?.type !== "cash_on_delivery"
  );
  return (
    <ul role="radiogroup" aria-label={t("shipping methods")}>
      {hasCod
        ? paymentMethods.map((item) => {
            const isActive = method?.id === item?.id;
            return (
              <li
                key={item.id}
                role="radio"
                aria-checked={isActive}
                tabIndex={0}
                onClick={() => setMethod(item)}
                onKeyDown={(e) => e.key === "Enter" && setMethod(item)}
                className={`cursor-pointer flex items-center gap-3 rounded-lg p-4 mb-4 border transition-all duration-200 ${
                  isActive
                    ? "border-orangeColor bg-orangeColor/20"
                    : "hover:border-orangeColor"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-orangeColor border-orangeColor"
                      : "border-gray-400"
                  }`}
                />
                <div className="flex-between">
                  <div>
                    <p>{t(item?.title)}</p>
                    <p>{t(item?.descreption)}</p>
                  </div>
                </div>
              </li>
            );
          })
        : filterWithoutCOD.map((item) => {
            const isActive = method?.id === item?.id;
            return (
              <li
                key={item.id}
                role="radio"
                aria-checked={isActive}
                tabIndex={0}
                onClick={() => setMethod(item)}
                onKeyDown={(e) => e.key === "Enter" && setMethod(item)}
                className={`cursor-pointer flex items-center gap-3 rounded-lg p-4 mb-4 border transition-all duration-200 ${
                  isActive
                    ? "border-orangeColor bg-orangeColor/20"
                    : "hover:border-orangeColor"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-orangeColor border-orangeColor"
                      : "border-gray-400"
                  }`}
                />
                <div className="flex-between">
                  <div>
                    <p>{t(item?.title)}</p>
                    <p>{t(item?.descreption)}</p>
                  </div>
                </div>
              </li>
            );
          })}
    </ul>
  );
};

export default PaymentMethods;
