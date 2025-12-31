// types
import type { Nav } from "../types/Nav";
import type { Lang } from "../types/Lang";
import { Payment } from "@/features/checkout/types/payment.type";

export const navLinks: Nav[] = [
  {
    name: "offers",
    link: "/products?filter-in_offer=true",
  },
  {
    name: "About",
    link: "/about-us",
  },

  {
    name: "blogs",
    link: "/blogs",
  },
  {
    name: "contact us",
    link: "/contact-us",
  },
  {
    name: "products",
    link: "/products",
  },
  {
    name: "faq",
    link: "/faq",
  },
];

export const protectedRoutes: string[] = [
  "/cart",
  "/checkout",
  "/payment",
  "/my-profile",
  "/my-wishlist",
  "/my-addresses",
  "/dashboard",
];

export const useflulLinks: Nav[] = [
  {
    name: "terms of use",
    link: "/terms-of-use",
  },
  {
    name: "terms & conditions",
    link: "/terms-conditions",
  },
  {
    name: "refund policy",
    link: "/refund-policy",
  },
  {
    name: "faq",
    link: "/faq",
  },
];
export const helpCenterLinks: Nav[] = [
  {
    name: "About",
    link: "/about",
  },

  {
    name: "blogs",
    link: "/refund-policy",
  },
];
export const myAccount: Nav[] = [
  {
    name: "my whishlist",
    link: "/my-profile/favorites",
  },
  {
    name: "my addresses",
    link: "my-profile/addresses",
  },
  {
    name: "my profile",
    link: "/my-profile/settings",
  },
  {
    name: "orders",
    link: "/my-profile/orders",
  },
];
export const LANGUAGES: Lang[] = [
  { flag: "/images/us.png", title: "english", label: "en" },
  { flag: "/images/ksa.png", title: "arabic", label: "ar" },
];
export const paymentMethods: Payment[] = [
  {
    id: 1,
    title: "Cash on Delivery (COD)",
    descreption:
      "Pay in cash directly to the courier when your order is delivered.",
    image: "/images/cod.png",
    type: "cash_on_delivery",
  },
  {
    id: 2,
    title: "Online Payment",
    descreption:
      "Pay securely online using your credit or debit card before delivery.",
    image: "/images/online-payment.png",
    type: "online",
  },
];
