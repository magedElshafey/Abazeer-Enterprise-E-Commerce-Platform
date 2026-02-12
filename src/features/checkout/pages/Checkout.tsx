import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin } from "react-icons/fi";
import { MdShoppingBag } from "react-icons/md";

import SEO from "@/common/components/seo/Seo";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import DialogComponent from "@/common/components/dialog/dialog";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import AddressCard from "@/features/user/components/addresses/AddressCard";
import OrderDetails from "../components/order-details/OrderDetails";
import PriceDetails from "../components/order-details/PriceDetails";
// import ShippingMethods from "../components/shipping-methods/ShippingMethods";
import PaymentMethods from "../components/payment-methods/PaymentMethods";
import CouponInput from "../components/copoun/CouponInput";

import useCheckoutLogic from "../logic/useCheckoutLogic";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { CartResponse } from "@/features/cart/types/Cart.types";
import OrderCardSkeleton from "@/common/components/loader/skeltons/OrderCardSkeleton";
import { useCart } from "@/store/CartProvider";
const Checkout = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    states: {
      coupon,
      localAddress,
      paymentMethod,
      notes,
      shiipingMethod,
      coast,
    },
    handlers,
    data,
    queries,
    refs,
    isPending,
  } = useCheckoutLogic();

  const { addressQuery } = queries;

  const { cartQuery } = useCart();

  useEffect(() => {
    //invalidate query to check for missing items;
    queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
  }, []);

  return (
    <>
      <SEO title={t("checkout")} />
      <main
        className="grid grid-cols-1 gap-6 p-4 containerr md:grid-cols-2"
        aria-labelledby="checkout-heading"
      >
        <h1 id="checkout-heading" className="sr-only">
          {t("checkout")}
        </h1>

        {/* ✅ LEFT SIDE - Order Summary */}
        <section aria-label={t("order details")}>
          <div className="p-5 shadow-sm bg-slate-100 rounded-xl">
            {(cartQuery?.data as CartResponse)?.items?.length ? (
              <>
                <OrderDetails />

                {/* <div className="py-4 mt-4 border-t border-b">
                  <h2 className="mb-3 font-semibold">
                    {t("shipping methods")}
                  </h2>
                  <FetchHandler queryResult={settingsQuery} skeletonType="list">
                    {data.shippingMethods.length && (
                      <ShippingMethods
                        method={shiipingMethod}
                        setMethod={handlers.setShippingMethod}
                        shippingMethods={data.shippingMethods}
                      />
                    )}
                  </FetchHandler>
                </div> */}

                <footer className="pt-4">
                  <PriceDetails coast={coast} />
                </footer>
              </>
            ) : cartQuery?.status === "pending" ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="mb-5">
                  <OrderCardSkeleton />
                </div>
              ))
            ) : (
              <EmptyStateCard
                icon={MdShoppingBag}
                link="/products"
                buttonText={t("browse_products")}
                title={t("no_products_in_cart")}
                description={t("no_products_in_cart_description")}
              />
            )}
          </div>

          {/* ✅ Coupon Section */}
          <section
            className="p-4 mt-6 bg-white border border-dashed rounded-lg shadow-sm border-orangeColor"
            aria-label={t("available coupons")}
          >
            <div className="flex-between">
              <p className="mt-4 font-bold rounded focus:outline-none focus:ring-2 text-orangeColor">
                {t("You have a coupon code?")}
              </p>
              <img
                src="/images/coupon-code.gif"
                alt={t("coupon icon")}
                loading="lazy"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="mt-7">
              <CouponInput
                code={coupon}
                handleCodeChange={handlers.handleCodeChange}
              />
            </div>
          </section>
        </section>

        {/* ✅ RIGHT SIDE - Address & Payment */}
        <section aria-label={t("address and payment")}>
          <FetchHandler
            queryResult={{
              ...addressQuery,
              isLoading: addressQuery.isLoading || addressQuery.isFetching,
            }}
            skeletonType="coupon"
          >
            {addressQuery?.isSuccess &&
            addressQuery.data?.length > 0 &&
            localAddress ? (
              <>
                <AddressCard address={localAddress} />

                <DialogComponent
                  ref={refs.dialogRef}
                  header={{ title: t("my addresses") }}
                  content={
                    <div className="max-h-[500px] overflow-y-auto md:w-[500px]">
                      {addressQuery.data.map((address) => (
                        <button
                          key={address.id}
                          onClick={() =>
                            handlers.handleLocalAddressChange(address)
                          }
                          className={`mb-4 border transition duration-200 hover:shadow-lg rounded-md w-full ${
                            localAddress?.id === address.id
                              ? "border-orangeColor"
                              : ""
                          }`}
                          aria-pressed={localAddress?.id === address.id}
                        >
                          <AddressCard
                            address={address}
                            hasEdit={false}
                            hasDelete={false}
                            hasDefault={false}
                          />
                        </button>
                      ))}
                    </div>
                  }
                >
                  <button className="my-4 font-medium underline text-slate-800">
                    {t("change address")}
                  </button>
                </DialogComponent>
              </>
            ) : (
              <EmptyStateCard
                icon={FiMapPin}
                link="/my-profile/addresses/create?to=/checkout"
                buttonText={t("add_first_address")}
                title={t("no_addresses_title")}
                description={t("no_addresses_description")}
              />
            )}
          </FetchHandler>

          <div className="mt-5">
            <PaymentMethods
              method={paymentMethod}
              setMethod={handlers.setPaymentMethod}
              paymentMethods={data.paymentMethods}
            />
          </div>

          <div className="mt-4">
            <MainTextArea
              value={notes}
              onChange={handlers.handleNotesChange}
              label={t("order notes")}
              placeholder={t("note your order")}
            />
          </div>

          <div className="mt-4 flex-center">
            <MainBtn
              text={t("checkout")}
              theme="secondary"
              onClick={handlers.handleCheckoutClick}
              disabled={
                isPending ||
                !localAddress?.id ||
                !paymentMethod?.type ||
                !shiipingMethod?.id ||
                !(cartQuery?.data as CartResponse)?.items.length
              }
              isPending={isPending}
              aria-busy={isPending}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default memo(Checkout);
