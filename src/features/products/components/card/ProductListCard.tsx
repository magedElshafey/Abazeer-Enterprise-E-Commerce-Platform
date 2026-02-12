import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import AddToCartButton from "../../../cart/components/button/AddToCartButton";
import { Product } from "../../types/product.types";
import { twMerge } from "tailwind-merge";
import ProductAlertButton from "../product-alert/ProductAlertButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";
import FavoriteButton from "../product-details/FavoriteButton";
import { formatDate } from "@/utils/formatDate";

interface ProductListCardProps {
  product: Product;
  className?: string;
}

const ProductListCard: React.FC<ProductListCardProps> = memo(
  ({ product, className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
    //   ? ((product?.sold_quantity || 0) / product.stock_quantity) * 100
    //   : 0;
    const handleCategoryNavigate = useCallback(() => {
      navigate(`/products?filter-category=${product.category_id}`);
    }, [navigate, product.category_id]);
    return (
      <div
        className={twMerge(
          "border relative group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor rounded-lg flex gap-4 p-4",
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
            className="absolute top-0 left-0 z-40 w-16 p-1 font-bold text-white rounded-br-lg flex-center bg-orangeColor"
            aria-label={`${product.discount_percentage}% ${t("discount")}`}
          >
            <p>{Math.ceil(product.discount_percentage)}%</p>
          </div>
        )}

        {/* ✅ Product image */}
        <div className="flex items-center justify-center flex-shrink-0 w-32 h-32 overflow-hidden bg-gray-100 rounded-lg">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 cursor-pointer group-hover:scale-105"
              onClick={handleNavigate}
            />
          ) : (
            <img
              src="/images/600x600.jpg"
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 cursor-pointer group-hover:scale-105"
              onClick={handleNavigate}
            />
          )}
        </div>

        {/* ✅ Right side: Content and Button in column */}
        <div className="flex flex-col justify-between flex-1 gap-3">
          {/* ✅ Product Info */}
          <div>
            <p
              onClick={handleCategoryNavigate}
              className="mb-1 text-xs font-medium text-gray-600 transition-colors duration-200 cursor-pointer group-hover:text-orangeColor hover:underline w-fit"
            >
              {product.category}
            </p>

            <button
              onClick={handleNavigate}
              className="mb-2 text-base font-medium text-blue-400 duration-200 cursor-pointer line-clamp-2 hover:underline text-start"
            >
              {product.name}
            </button>

            {/* ✅ Reviews */}
            <div
              className="flex items-center gap-1 mb-2"
              aria-label={`${product.average_rate} out of 5 stars`}
            >
              <div className="flex gap-0.5">{reviewStars}</div>
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
                className="flex items-center justify-center gap-1 text-xl font-bold text-orangeColor"
              >
                <p> {product.sale_price || +product?.price}</p>
                <SaudiCurrency />
              </div>

              {product?.has_discount && product?.sale_price && (
                <p className="flex items-center gap-1 text-sm text-gray-500 line-through">
                  <p>{product.price}</p> <SaudiCurrency />
                </p>
              )}
            </div>

            {/* ✅ Progress bar */}
            {/* <div
              className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1 ${
                product.stock_quantity == 0 ? "invisible" : ""
              }`}
              aria-label={`Stock remaining: ${product.sold_quantity} of ${product.stock_quantity}`}
            >
              <div
                className="h-full transition-all duration-500 bg-orangeColor"
                style={{ width: `${progressPercent}%` }}
              />
            </div> */}
            {product?.stock_quantity > 0 && (
              <div className="my-3 text-xs flex-between">
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

            {product.stock_quantity > 0 ? (
              <p
                className="mb-2 text-sm font-medium text-end"
                aria-live="polite"
              >
                {t("sold")} : {product.sold_quantity || 0} /{" "}
                {product.stock_quantity + (product?.sold_quantity || 0)}
              </p>
            ) : (
              <p className="mb-2 text-sm font-medium text-end">
                {t("not-available")}
              </p>
            )}
          </div>

          {/* ✅ Add to cart button - full width on mobile, fixed width on desktop */}
          <div className="w-full md:w-fit md:self-start">
            {product?.stock_quantity > 0 ? (
              <div className="w-full">
                <AddToCartButton product={product} tabIndex={0} />
              </div>
            ) : (
              <ProductAlertButton productId={product.id}>
                {({ onClick }) => (
                  <MainBtn
                    onClick={onClick}
                    className="sm:!w-fit px-5 text-sm font-normal  rounded-md"
                  >
                    {t("notify me")}
                  </MainBtn>
                )}
              </ProductAlertButton>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default ProductListCard;
