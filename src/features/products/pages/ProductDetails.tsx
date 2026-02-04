import { FC } from "react";
import { useParams } from "react-router-dom";
import ProductPhotos from "../components/product-details/ProductPhotos";
import ProductInfo from "../components/product-details/ProductInfo";
import ProductFeatures from "../components/product-details/ProductFeatures";
import ProductFooter from "../components/product-details/ProductFooter";
import RelatedProducts from "../components/product-details/RelatedProducts";
import useGetProductDetails from "../api/useGetProductDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryResult = useGetProductDetails({
    productId: id || "",
  });
  const { data: product } = queryResult;
  return (
    <div className="bg-background-gray min-h-screen pb-10">
      <div className="containerr pt-10">
        <FetchHandler queryResult={queryResult} skeletonType="productDetails">
          <div className="bg-white p-6 lg:p-10 flex flex-col lg:flex-row gap-2 rounded-lg">
            <div className="flex-1">
              <ProductPhotos media={product?.images || []} 
              >
            </div>

            <div className="w-full lg:w-1/3">
              {product && <ProductInfo product={product} />}
            </div>
            <div className="w-full lg:w-1/5">
              <ProductFeatures />
            </div>
          </div>

          <div className="mt-8 bg-white p-2 rounded-lg">
            <ProductFooter product={product!} />
          </div>
          {product && product?.related_products_data?.length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-lg">
              <RelatedProducts
                products={product?.related_products_data || []}
              />
            </div>
          )}
        </FetchHandler>
      </div>
    </div>
  );
};

export default ProductDetails;
