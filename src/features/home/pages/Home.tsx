// hooks
import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetHomeSlider from "../api/hero/useGetHomeSlider";
import useGetHomeBanner from "../api/hero/useGetHomeBanner";
import useGetAllProducts from "../../products/api/useGetAllProducts";
import useGetBrands from "../../brands/api/useGetBrands";
import useGetBlogs from "../../static-pages/api/blogs/useGetBlogs";
import useGetFlashsale from "../api/flash-sale/useGetFlashsale";
// types
import { Brand } from "../../brands/types/brand.types";
import { Product } from "../../products/types/product.types";
import { CategoriesListType } from "../../categories/types/category.types";
// components
import SEO from "@/common/components/seo/Seo";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import HomeHero from "../components/hero/HomeHero";
import HomeSection from "../components/home-section/HomeSection";
import CategoryCard from "../../categories/components/card/CategoryCard";
import ProductCard from "../../products/components/card/ProductCard";
import BrandsCard from "../../brands/components/card/BrandsCard";
import BlogCard from "../../static-pages/components/blogs/card/BlogCard";
import SectionTitle from "@/common/components/titles/SectionTitle";
import MainBtn from "@/common/components/buttons/MainBtn";
import FlashSaleSection from "../components/flash-sale/components/FlashSaleSection";
// constant
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import useGetAllGallries from "../api/gallery/useGetAllGallries";
import useGetAds from "../api/ads/useGetAds";
import Slider from "@/common/components/slider/Slider";
import useGetTestimonials from "../api/testimonials/useGetTestimonials";
import { Testimonials } from "../types/testimonials.types";
import TestimonialsCard from "../components/testimonials/TestimonialsCard";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

const Home = () => {
  const { t } = useTranslation();
  const [galleryFullScreenIndex, setGalleryFullScreenIndex] = useState<
    number | null
  >(null);

  const landingProducts = useGetAllProducts({
    landing: true,
    delay: delayOptions,
  });
  const featuredProducts = useGetAllProducts({
    featured: true,
    delay: delayOptions,
  });
  const essentialProducts = useGetAllProducts({
    essential: true,
    delay: delayOptions,
  });
  const categories = useGetAllCategories();
  const brands = useGetBrands({ featured: true, delay: delayOptions });
  const blogsQueryResult = useGetBlogs();

  const flashsaleQueryReuslt = useGetFlashsale();
  const sliderQueryResult = useGetHomeSlider();
  const bannerQueryResult = useGetHomeBanner();
  const galleryQueryResult = useGetAllGallries();
  const adsQueryResult = useGetAds();
  const testimonailsQueryResult = useGetTestimonials();
  const navigate = useNavigate();
  const galleryItems = galleryQueryResult?.data ?? [];

  useEffect(() => {
    if (galleryFullScreenIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [galleryFullScreenIndex]);

  const closeGalleryFullScreen = useCallback(() => {
    setGalleryFullScreenIndex(null);
  }, []);

  const handleNextGalleryImage = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setGalleryFullScreenIndex((prev) => {
        if (prev === null || galleryItems.length === 0) {
          return prev;
        }
        return (prev + 1) % galleryItems.length;
      });
    },
    [galleryItems.length],
  );

  const handlePrevGalleryImage = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setGalleryFullScreenIndex((prev) => {
        if (prev === null || galleryItems.length === 0) {
          return prev;
        }
        return (prev - 1 + galleryItems.length) % galleryItems.length;
      });
    },
    [galleryItems.length],
  );

  const handleNavigate = useCallback(() => {
    navigate("/blogs");
  }, [navigate]);
  const defaultBreakPoints = {
    "(max-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
    "(max-width: 768px)": { slides: { perView: 2, spacing: 16 } },
    "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
  };
  return (
    <>
      <SEO title={t("home")} />
      {/* hero section : slider and offer banner  */}
      <FetchHandler queryResult={sliderQueryResult} skeletonType="slider">
        {sliderQueryResult &&
          sliderQueryResult?.data &&
          bannerQueryResult &&
          bannerQueryResult?.data && (
            <HomeHero
              sliders={sliderQueryResult?.data}
              banner={bannerQueryResult?.data}
            />
          )}
      </FetchHandler>

      {/* shop with categories section */}
      <div className="containerr space-between-sections">
        <HomeSection<CategoriesListType, { category: CategoriesListType }>
          title={t("shop with categories")}
          queryResult={categories}
          skeletonType="category"
          CardComponent={CategoryCard}
          getCardProps={(item) => ({ category: item })}
          breakPoints={{
            "(min-width: 1400px)": { slides: { perView: 7, spacing: 16 } },
            "(max-width: 1400px)": { slides: { perView: 6, spacing: 16 } },
            "(max-width: 1280px)": { slides: { perView: 5, spacing: 16 } },
            "(max-width: 1024px)": { slides: { perView: 4, spacing: 16 } },
            "(max-width: 768px)": { slides: { perView: 3, spacing: 16 } },
            "(max-width: 580px)": { slides: { perView: 2, spacing: 12 } },
          }}
        />
      </div>
      {/* flash sale section */}
      <FetchHandler queryResult={flashsaleQueryReuslt} skeletonType="product">
        {flashsaleQueryReuslt?.data &&
          flashsaleQueryReuslt?.data?.products?.length && (
            <div className="space-between-sections">
              <FlashSaleSection data={flashsaleQueryReuslt?.data} />
            </div>
          )}
      </FetchHandler>
      <div className="containerr">
        {/* shop with brands section */}
        <div className="space-between-sections">
          <HomeSection<Brand, { brand: Brand }>
            title={t("featured brands")}
            queryResult={brands}
            skeletonType="brand"
            CardComponent={BrandsCard}
            getCardProps={(item) => ({ brand: item })}
            breakPoints={{
              "(max-width: 1400px)": { slides: { perView: 5, spacing: 16 } },
              "(max-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
              "(max-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
              "(max-width: 768px)": { slides: { perView: 2, spacing: 16 } },
              "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
            }}
          />
        </div>
        {/* ads section */}
        <div className="space-between-sections">
          <FetchHandler queryResult={adsQueryResult} skeletonType="image">
            {adsQueryResult?.data && adsQueryResult?.data?.length > 0 && (
              <div className="containerr">
                <Slider
                  key={adsQueryResult?.data?.length}
                  title={"featured"}
                  loop
                  spacing={10}
                  breakPoints={defaultBreakPoints}
                >
                  {adsQueryResult?.data.map((ad) => (
                    <Link
                      key={ad?.id}
                      to={`/products?filter-category=${ad?.category_id}`}
                      className="block w-full overflow-hidden rounded-xl"
                    >
                      <div className="relative w-full aspect-[688/420]">
                        <img
                          loading="lazy"
                          alt={ad?.category?.name || "Ad image"}
                          src={ad?.image || "/images/placeholder.jpg"}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          decoding="async"
                        />
                      </div>
                    </Link>
                  ))}
                </Slider>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {adsQueryResult?.data?.slice(0, 3)?.map((ad) => (
                   
                  ))}
                </div> */}
              </div>
            )}
          </FetchHandler>
        </div>
        {/* new arrivale products */}
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("just landing")}
            queryResult={landingProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>
        {/* featured products section */}
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("featured products")}
            queryResult={featuredProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>
        {/* essintal product section  */}
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("essential products")}
            queryResult={essentialProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>

        {/* products from our farms section */}
        <div className="space-between-sections">
          <FetchHandler queryResult={galleryQueryResult} skeletonType="image">
            {galleryQueryResult?.data &&
              galleryQueryResult?.data?.length > 0 && (
                <>
                  <Slider
                    title="Pictures from our farms"
                    breakPoints={{
                      "(min-width: 1280px)": {
                        slides: { perView: 7, spacing: 16 },
                      },
                      "(max-width: 1280px)": {
                        slides: { perView: 6, spacing: 16 },
                      },
                      "(max-width: 1024px)": {
                        slides: { perView: 5, spacing: 16 },
                      },
                      "(max-width: 768px)": {
                        slides: { perView: 4, spacing: 16 },
                      },
                      "(max-width: 580px)": {
                        slides: { perView: 3, spacing: 12 },
                      },
                    }}
                  >
                    {galleryQueryResult?.data?.map((item, index) => (
                      <img
                        key={item?.id}
                        alt={item?.name}
                        src={item?.image || "/images/g.png"}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover rounded-lg cursor-zoom-in transition-transform duration-300 hover:scale-105"
                        onClick={() => {
                          setGalleryFullScreenIndex(index);
                        }}
                      />
                    ))}
                  </Slider>
                </>
              )}
          </FetchHandler>
        </div>
        {galleryFullScreenIndex !== null &&
          galleryItems.length > 0 &&
          galleryItems[galleryFullScreenIndex] && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeGalleryFullScreen}
            >
              <button
                onClick={closeGalleryFullScreen}
                className="absolute top-4 right-4 z-10 text-white hover:text-orangeColor transition-colors duration-200"
              >
                <IoClose className="w-8 h-8" />
              </button>
              {galleryItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrevGalleryImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                  >
                    <IoChevronBack className="w-8 h-8" />
                  </button>
                  <button
                    onClick={handleNextGalleryImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                  >
                    <IoChevronForward className="w-8 h-8" />
                  </button>
                </>
              )}
              <div
                className="w-[90vw] h-[90vh] flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={
                    galleryItems[galleryFullScreenIndex]?.image ||
                    "/images/g.png"
                  }
                  alt={
                    galleryItems[galleryFullScreenIndex]?.name ||
                    "Full screen product image"
                  }
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {galleryFullScreenIndex + 1} / {galleryItems.length}
              </div>
            </div>
          )}
        {/* blogs section */}
        <div className="space-between-sections">
          <FetchHandler queryResult={blogsQueryResult} skeletonType="blog">
            {blogsQueryResult?.data && blogsQueryResult?.data?.length > 0 && (
              <div>
                <div className="flex-between flex-col md:flex-row  mb-6">
                  <SectionTitle title="latest blogs" />
                  {blogsQueryResult?.data?.length > 5 && (
                    <MainBtn text="show more" onClick={handleNavigate} />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5">
                  {blogsQueryResult?.data?.slice(0, 5)?.map((blog) => (
                    <BlogCard key={blog?.id} data={blog} />
                  ))}
                </div>
              </div>
            )}
          </FetchHandler>
        </div>
        {/* testimonials section */}
        <div className="space-between-sections">
          <HomeSection<Testimonials, { data: Testimonials }>
            title={t("Testimonials")}
            queryResult={testimonailsQueryResult}
            skeletonType="testimonail"
            CardComponent={TestimonialsCard}
            getCardProps={(item) => ({ data: item })}
            breakPoints={{
              "(min-width: 772px)": { slides: { perView: 2, spacing: 16 } },
              "(max-width: 772px)": { slides: { perView: 1, spacing: 12 } },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
