import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import SquareImage from "../../../../common/components/images/sqaure-image/SqaureImage";
import AddToCartButton from "../../../cart/components/button/AddToCartButton";
import { Product } from "../../types/product.types";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "../product-details/FavoriteButton";
import ProductAlertButton from "../product-alert/ProductAlertButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";
import { formatDate } from "@/utils/formatDate";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    console.log("product", product);
    const handleNavigate = useCallback(() => {
      navigate(`/products/${product.id}`);
    }, [navigate, product.id]);

    const reviewStars = useMemo(() => {
      return Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.round(product?.average_rate || 0);
        return (
          <FaStar
            key={index}
            className={`transition-colors duration-200 ${
              filled ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        );
      });
    }, [product?.average_rate]);

    // const progressPercent = product.stock_quantity
    //   ? ((product?.sold_quantity || 0) /
    //       (product.stock_quantity + (product.sold_quantity || 0))) *
    //     100
    //   : 0;
    const handleCategoryNavigate = useCallback(() => {
      navigate(`/products?filter-category=${product.category_id}`);
    }, [navigate, product.category_id]);
    return (
      <div
        className={twMerge(
          "border relative px-6 pt-6 pb-3 group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor text-start flex flex-col justify-between h-full min-h-[400px] group",
          className,
        )}
        aria-label={`${product.name} - ${product.category}`}
      >
        <div
          className="absolute top-2 right-2 w-7 h-7 bg-white flex-center border shadow rounded-[50%] z-20 
    md:opacity-0 
    md:translate-y-[-10px]
    md:group-hover:opacity-100 
    md:group-hover:translate-y-0 
    transition-all duration-300"
        >
          <FavoriteButton
            productId={product?.id}
            showLabel={false}
            isInWishlist={product?.is_in_wishlist}
          />
        </div>
        {/* ✅ Discount badge */}
        {product?.has_discount && product.discount_percentage > 0 && (
          <div
            className="absolute top-0 left-0 z-20 w-16 p-1 font-bold text-white rounded-br-lg flex-center bg-orangeColor"
            aria-label={`${product.discount_percentage}% ${t("discount")}`}
          >
            <p>{Math.ceil(product.discount_percentage)}%</p>
          </div>
        )}

        {/* ✅ Product image */}
        <SquareImage
          src={product.image || "/images/600x600.jpg"}
          alt={product.name}
        />

        {/* ✅ Content */}
        <div className="relative mt-3">
          <p
            onClick={handleCategoryNavigate}
            className="mb-1 text-sm font-medium text-gray-600 transition-colors duration-300 cursor-pointer w-fit hover:underline group-hover:text-orangeColor"
          >
            {product.category}
          </p>

          <button
            onClick={handleNavigate}
            className="mb-1 text-base font-medium text-blue-400 duration-200 cursor-pointer line-clamp-1 hover:underline text-start"
          >
            {product.name}
          </button>

          {/* ✅ Reviews */}
          <div
            className="flex items-center gap-1 mb-1"
            aria-label={`${product.average_rate} out of 5 stars`}
          >
            {reviewStars}
            <span className="ml-1 text-sm text-gray-500">
              ({product.ratings_count || 0})
            </span>
          </div>

          {/* ✅ Price */}
          <div className="flex items-center gap-3 mb-2">
            <div
              aria-label={`${product.sale_price || product?.price} ${t(
                "Saudi Riyal",
              )}`}
              className="flex items-center gap-1 text-lg font-bold text-orangeColor"
            >
              <p> {product.sale_price || +product?.price}</p> <SaudiCurrency />
            </div>

            {product?.has_discount && product?.sale_price && (
              <p className="flex items-center gap-1 text-sm text-gray-500 line-through">
                {product.price} <SaudiCurrency />
              </p>
            )}
          </div>

          {/* ✅ Progress bar */}
          {/* <div
            className={`w-full h-3 bg-gray-200 overflow-hidden mb-1 ${
              product.stock_quantity == 0 ? "invisible" : ""
            }`}
            aria-label={`Stock remaining: ${product.sold_quantity} of ${product.stock_quantity}`}
          >
            <div
              className="h-full transition-all duration-500 bg-orangeColor"
              style={{ width: `${progressPercent}%` }}
            />
          </div> */}
          {/* {product.stock_quantity > 0 ? (
            <p className="mb-2 text-sm font-medium text-end" aria-live="polite">
              {t("sold")} : {product.sold_quantity || 0} /{" "}
              {product.stock_quantity + (product?.sold_quantity || 0)}
            </p>
          ) : (
            <p className="mb-2 text-sm font-medium text-end">
              {t("not-available")}
            </p>
          )} */}
          {product?.stock_quantity > 0 && (
            <div className="text-xs flex-between">
              <div>
                <p className=" text-slate-500">{t("Production date")}</p>
                <p>{formatDate(product?.product_at)}</p>
              </div>
              <div>
                <p className=" text-slate-500">{t("expired date")}</p>
                <p>{formatDate(product?.expired_at)}</p>
              </div>
            </div>
          )}

          {product?.stock_quantity > 0 ? (
            <div className=" lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-500 lg:ease-in-out will-change-transform will-change-opacity">
              <AddToCartButton product={product} tabIndex={0} />
            </div>
          ) : (
            <ProductAlertButton productId={product.id}>
              {({ onClick, isPending }) => (
                <MainBtn
                  isPending={isPending}
                  onClick={onClick}
                  className="lg:translate-y-full 
                lg:opacity-0
                lg:group-hover:translate-y-0 
                lg:group-hover:opacity-100
                lg:transition-all lg:duration-500 
                lg:ease-in-out
                will-change-transform will-change-opacity flex-center sm:!w-full py-1 bg-orangeColor !font-normal text-white rounded-md"
                >
                  {t("notify me")}
                </MainBtn>
              )}
            </ProductAlertButton>
          )}
          {/* ✅ Add to cart button with smooth animation */}
        </div>
      </div>
    );
  },
);

export default ProductCard;
