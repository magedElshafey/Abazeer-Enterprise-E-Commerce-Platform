import { FC } from "react";
import { Link } from "react-router-dom";
import ProductRate from "./ProductRate";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import ProductQuantity from "./ProductQuantity";
import AddToCartButton from "@/features/cart/components/button/AddToCartButton";
import { ProductDetails } from "../../types/product.types";
import HtmlConverter from "../../../../common/components/htmlConverter/HtmlConverter";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

import { useState } from "react";
import { useCart } from "@/store/CartProvider";
import ProductAlertButton from "../product-alert/ProductAlertButton";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";
type Props = {
  product: ProductDetails;
};

const ProductInfo: FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const { isInCart } = useCart();

  const inCart = isInCart(product.id);

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="pb-4 border-b ">
        <div className="mb-3">
          <p className="mb-2 text-xl text-inherit text-wrap">{product?.name}</p>
          <ProductRate
            rating={product?.average_rate}
            reviewCount={product?.reviews.length}
          />
        </div>
        {/* {product?.stock_quantity > 0 && (
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
        )} */}
      </div>
      <div>
        <div className="flex items-center gap-1 text-2xl font-bold text-text-darkRed">
          <p>{product.has_discount ? product.sale_price : product.price}</p>
          <SaudiCurrency />
        </div>
        <span className="invisible">place</span>
        {product?.has_discount && (
          <div className="flex items-center gap-1 text-lg font-bold line-through text-text-gray opacity-60">
            <p>{product?.price}</p> <SaudiCurrency />
          </div>
        )}
      </div>
      <div className="appearance-auto">
        <HtmlConverter html={product?.description} />
      </div>
      <div
        className={`text-sm w-fit flex items-center gap-4 rounded border py-1 px-2 ${
          product?.stock_status === "in_stock"
            ? "bg-background-green/20 border-background-green"
            : "bg-red-50 border-red-300"
        }`}
      >
        <p>{t("availability")}</p>
        <p
          className={
            product?.stock_status === "in_stock"
              ? "text-background-green"
              : "text-red-600"
          }
        >
          {product?.stock_quantity} {t("currently available")}
        </p>
      </div>
      {product?.stock_quantity > 0 ? (
        <div>
          {!inCart && <p>{t("quantity")}</p>}
          <div className="flex flex-col gap-2 mt-1 sm:flex-row lg:flex-col xl:flex-row">
            {!inCart && (
              <ProductQuantity
                className="w-full"
                maxQuantity={product?.stock_quantity}
                onQuantityChange={setQuantity}
              />
            )}
            <AddToCartButton
              product={{ ...product, category: product?.category?.name }}
              quantity={quantity}
            />
            {/* <MainBtn
              onClick={handleBuyNow}
              className="sm:!w-full py-1"
              theme="secondary"
            >
              {t("buy_now")}
            </MainBtn> */}
          </div>
        </div>
      ) : (
        <ProductAlertButton productId={product?.id}>
          {({ onClick, isPending }) => (
            <MainBtn
              className="sm:w-full"
              isPending={isPending}
              onClick={onClick}
            >
              {t("notify me")}
            </MainBtn>
          )}
        </ProductAlertButton>
      )}

      <div className="flex items-center gap-5 pb-4 border-b">
        <FavoriteButton
          productId={product.id}
          isInWishlist={product.is_in_wishlist}
        />
        <ShareButton product={product} />
      </div>

      {/* Product Metadata Section */}
      <div className="space-y-3">
        {/* Brand */}
        {product?.brand && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 me-2">
              {t("brand")}:
            </span>
            <Link
              to={`/products?filter-brand=${product?.brand.id}`}
              className="text-gray-600 transition-colors duration-200 hover:text-orangeColor hover:underline"
            >
              {product?.brand.name}
            </Link>
          </div>
        )}

        {/* Category */}
        {product?.category && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 me-2">
              {t("category")}:
            </span>
            <Link
              to={`/products?filter-category=${product?.category.id}`}
              className="text-gray-600 transition-colors duration-200 hover:text-orangeColor hover:underline"
            >
              {product?.category.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
