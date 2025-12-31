// // hooks
// import { useRef, useState, useEffect, useCallback, useMemo } from "react";
// import { useCart } from "@/store/CartProvider";
// import useGetUserAddresses from "@/features/user/api/addresses/useGetUserAddresses";
// import useCheckout from "../api/checkout/useCheckout";
// // types
// import type { Payment } from "../types/payment.type";
// import type { Address } from "@/features/user/types/addresses.types";
// // data
// import { paymentMethods } from "@/data/data";
// // toast
// import { toast } from "sonner";
// // utils
// import handlePromisError from "@/utils/handlePromiseError";
// import { Shippings } from "../types/shipping.types";
// import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
// import { useQueryClient } from "@tanstack/react-query";
// import { apiRoutes } from "@/services/api-routes/apiRoutes";

// const useCheckoutLogic = () => {
//   const queryClient = useQueryClient();
//   const dialogRef = useRef<{ close: () => void, open: () => void }>(null);
//   const { items, setCouponCode } = useCart();
//   const settingsQuery = useGetWebsiteSettings();
//   const { data: settings, isLoading: settingsLoading } = settingsQuery;

//   // ✅ Group related states logically
//   const [shippingMethods, setShippingMethods] = useState<Shippings[]>([]);
//   const [shiipingMethod, setShippingMethod] = useState<Shippings>(
//     shippingMethods[0]
//   );

//   const [coupon, setCoupon] = useState<{
//     code: string;
//     value: string;
//     type: string;
//   }>({ code: "", value: "", type: "" });
//   const [paymentMethod, setPaymentMethod] = useState<Payment>(
//     paymentMethods[0]
//   );
//   const [localAddress, setLocalAddress] = useState<Address | undefined>();
//   const [notes, setNotes] = useState("");

//   const addressQuery = useGetUserAddresses();

//   // ✅ Use derived state only when necessary
//   useEffect(() => {
//     if (
//       addressQuery.isFetching ||
//       !addressQuery.isSuccess ||
//       !addressQuery.data?.length ||
//       localAddress
//     )
//       return;

//     const defaultAddress =
//       addressQuery.data.find((a) => a.is_default) ?? addressQuery.data[0];
//     setLocalAddress(defaultAddress);
//   }, [
//     addressQuery.isSuccess,
//     addressQuery.data,
//     localAddress,
//     addressQuery.isFetching,
//   ]);

//   const { mutateAsync, isPending } = useCheckout();

//   // ✅ useCallback to avoid unnecessary re-renders
//   const handleCodeChange = useCallback(
//     (e: string) =>
//       setCoupon((prev) => ({ ...prev, value: e })),
//     []
//   );

//   const handleNotesChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
//     []
//   );

//   const handleLocalAddressChange = useCallback((value: Address) => {
//     setLocalAddress(value);
//     dialogRef.current?.close();
//   }, []);

//   const handleCheckoutClick = useCallback(async () => {
//     try {
//       const payload = {
//         products: items.map((item) => ({
//           product_id: item.id,
//           quantity: item.quantity,
//         })),
//         payment_type: paymentMethod.type,
//         notes,
//         address_id: localAddress?.id ?? 0,
//         coupon_code: coupon.code || undefined,
//       };

//       const response = await mutateAsync(payload);

//       if (response?.status) {
//         toast.success(response?.message);
//         setCouponCode(undefined);

//         // ✅ اعمل refetch فوري
//         await queryClient.refetchQueries({
//           queryKey: [apiRoutes.cart, coupon.code || undefined],
//         });
//       }
//     } catch (error) {
//       handlePromisError(error);
//       queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
//     }
//   }, [
//     items,
//     paymentMethod,
//     notes,
//     localAddress,
//     coupon.code,
//     mutateAsync,
//     setCouponCode,
//   ]);

//   useEffect(() => {
//     if (!settingsLoading && settings) {
//       const shippingMethod = {
//         coastLabel: settings.delivery_fee,
//         id: 1,
//         name: "delivery",
//         value: parseInt(settings.delivery_fee),
//       };
//       setShippingMethods([shippingMethod]);
//       setShippingMethod(shippingMethod);
//     }
//   }, [settings, settingsLoading]);

//   // ✅ Memoize returned object for better performance
//   return useMemo(
//     () => ({
//       states: {
//         coupon,
//         paymentMethod,
//         localAddress,
//         notes,
//         shiipingMethod,
//       },
//       handlers: {
//         handleCodeChange,
//         handleNotesChange,
//         handleLocalAddressChange,
//         handleCheckoutClick,
//         setCoupon,
//         setPaymentMethod,
//         setShippingMethod,
//       },
//       data: { paymentMethods, shippingMethods },
//       queries: { addressQuery, settingsQuery },
//       refs: { dialogRef },
//       isPending,
//     }),
//     [
//       coupon,
//       paymentMethod,
//       localAddress,
//       notes,
//       handleCodeChange,
//       handleNotesChange,
//       handleLocalAddressChange,
//       handleCheckoutClick,
//       addressQuery,
//       isPending,
//       shiipingMethod,
//       settingsQuery,
//     ]
//   );
// };

// export default useCheckoutLogic;
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "@/store/CartProvider";
import useGetUserAddresses from "@/features/user/api/addresses/useGetUserAddresses";
import useCheckout, { CheckoutResponse } from "../api/checkout/useCheckout";
import useOnlinePayment from "../api/checkout/useOnlinePayment";

import type { Payment } from "../types/payment.type";
import type { Address } from "@/features/user/types/addresses.types";
import { paymentMethods } from "@/data/data";

import { toast } from "sonner";
import handlePromisError from "@/utils/handlePromiseError";
import { Shippings } from "../types/shipping.types";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useNavigate } from "react-router-dom";

function extractOrderId(res: CheckoutResponse): number | null {
  const id = res?.id ?? res?.data?.id;
  return typeof id === "number" && id > 0 ? id : null;
}

function extractPaymentUrl(res: any): string | null {
  const url =
    res?.payment_url ??
    res?.payment_url ??
    res?.data?.payment_url ??
    res?.data?.payment_url;

  return typeof url === "string" && url.length > 10 ? url : null;
}

const useCheckoutLogic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dialogRef = useRef<{ close: () => void; open: () => void }>(null);
  const { items, setCouponCode } = useCart();

  const settingsQuery = useGetWebsiteSettings();
  const { data: settings, isLoading: settingsLoading } = settingsQuery;

  const [shippingMethods, setShippingMethods] = useState<Shippings[]>([]);
  const [shiipingMethod, setShippingMethod] = useState<Shippings>(
    shippingMethods[0]
  );

  const [coupon, setCoupon] = useState<{
    code: string;
    value: string;
    type: string;
  }>({ code: "", value: "", type: "" });

  const [paymentMethod, setPaymentMethod] = useState<Payment>(
    paymentMethods[0]
  );
  const [localAddress, setLocalAddress] = useState<Address | undefined>();
  const [notes, setNotes] = useState("");

  const addressQuery = useGetUserAddresses();

  useEffect(() => {
    if (
      addressQuery.isFetching ||
      !addressQuery.isSuccess ||
      !addressQuery.data?.length ||
      localAddress
    )
      return;

    const defaultAddress =
      addressQuery.data.find((a) => a.is_default) ?? addressQuery.data[0];
    setLocalAddress(defaultAddress);
  }, [
    addressQuery.isSuccess,
    addressQuery.data,
    localAddress,
    addressQuery.isFetching,
  ]);

  const checkoutMutation = useCheckout();
  const onlinePaymentMutation = useOnlinePayment();

  const isPending =
    checkoutMutation.isPending || onlinePaymentMutation.isPending;

  const handleCodeChange = useCallback((e: string) => {
    setCoupon((prev) => ({ ...prev, value: e }));
  }, []);

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
    []
  );

  const handleLocalAddressChange = useCallback((value: Address) => {
    setLocalAddress(value);
    dialogRef.current?.close();
  }, []);

  const handleCheckoutClick = useCallback(async () => {
    // ✅ Hard Guards (حماية من الضغط والبيانات الناقصة)
    if (!items?.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!localAddress?.id) {
      toast.error("Please select an address.");
      return;
    }
    if (!paymentMethod?.type) {
      toast.error("Please select a payment method.");
      return;
    }

    try {
      const payload = {
        products: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_type: paymentMethod.type,
        notes,
        address_id: localAddress.id,
        coupon_code: coupon.code || undefined,
      };

      // 1) ✅ Create Order
      const orderRes = await checkoutMutation.mutateAsync(payload);

      if (!orderRes?.status) {
        toast.error(orderRes?.message || "Checkout failed.");
        return;
      }

      // Always show success message if exists
      if (orderRes?.message) toast.success(orderRes.message);

      // ✅ Invalidate / refetch cart
      setCouponCode(undefined);
      await queryClient.refetchQueries({
        queryKey: [apiRoutes.cart],
      });

      // 2) Branch by payment type
      if (paymentMethod.type !== "online") {
        // COD -> success page
        navigate("/order-success");
        return;
      }

      // 3) Online Payment flow
      const orderId = extractOrderId(orderRes);
      if (!orderId) {
        toast.error("Missing order id from checkout response.");
        return;
      }

      const payRes = await onlinePaymentMutation.mutateAsync(orderId);

      if (!payRes?.status) {
        toast.error(payRes?.message || "Online payment initialization failed.");
        return;
      }

      const url = extractPaymentUrl(payRes);
      if (!url) {
        toast.error("Missing payment URL from online payment response.");
        return;
      }

      // ✅ Redirect (أفضل حل)
      window.location.assign(url);
    } catch (error) {
      handlePromisError(error);
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
    }
  }, [
    items,
    localAddress,
    paymentMethod,
    notes,
    coupon.code,
    checkoutMutation,
    onlinePaymentMutation,
    queryClient,
    setCouponCode,
    navigate,
  ]);

  useEffect(() => {
    if (!settingsLoading && settings) {
      const shippingMethod = {
        coastLabel: settings.delivery_fee,
        id: 1,
        name: "delivery",
        value: parseInt(settings.delivery_fee),
      };
      setShippingMethods([shippingMethod]);
      setShippingMethod(shippingMethod);
    }
  }, [settings, settingsLoading]);

  return useMemo(
    () => ({
      states: {
        coupon,
        paymentMethod,
        localAddress,
        notes,
        shiipingMethod,
      },
      handlers: {
        handleCodeChange,
        handleNotesChange,
        handleLocalAddressChange,
        handleCheckoutClick,
        setCoupon,
        setPaymentMethod,
        setShippingMethod,
      },
      data: { paymentMethods, shippingMethods },
      queries: { addressQuery, settingsQuery },
      refs: { dialogRef },
      isPending,
    }),
    [
      coupon,
      paymentMethod,
      localAddress,
      notes,
      shiipingMethod,
      handleCodeChange,
      handleNotesChange,
      handleLocalAddressChange,
      handleCheckoutClick,
      addressQuery,
      settingsQuery,
      isPending,
      shippingMethods,
    ]
  );
};

export default useCheckoutLogic;
