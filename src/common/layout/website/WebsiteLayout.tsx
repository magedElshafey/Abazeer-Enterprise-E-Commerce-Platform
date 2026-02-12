import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import ScrollToTopButton from "./common/scroll-to-top/ScrollToTopButton";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
import Header from "./larg-screens/header/Header";
import StickyNavbar from "./larg-screens/sticky-navbar/StickyNavbar";
import CategoriesHeader from "./larg-screens/navbar/category-header/CategoriesHeader";
import Breadcrumb from "./common/breadcrumb/components/Breadcrumb";
import { Outlet } from "react-router-dom";
import Footer from "./common/footer/Footer";
import { useTranslation } from "react-i18next";
import FooterSkeleton from "@/common/components/loader/skeltons/FooterSkeleton";
import NavbarSkeleton from "@/common/components/loader/skeltons/NavbarSkeleton";
// import { useEffect , useState} from "react";
// import NewsletterModal from "@/common/components/news-letter-modal/NewsLetterModal";

const WebsiteLayout = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data, isLoading } = useGetWebsiteSettings();
  // const [showNewsletter, setShowNewsletter] = useState(false);

  // useEffect(() => {
  //   const hasSeenModal = sessionStorage.getItem("hasSeenNewsletterModal"); // ✅ استخدم sessionStorage
  //   if (!hasSeenModal) {
  //     setShowNewsletter(true);
  //   }
  // }, []);

  // const handleCloseModal = () => {
  //   sessionStorage.setItem("hasSeenNewsletterModal", "true"); // ✅ استخدم sessionStorage هنا كمان
  //   setShowNewsletter(false);
  // };
  return (
    <div className="flex flex-col min-h-screen">
      {/* {showNewsletter && <NewsletterModal onClose={handleCloseModal} />} */}
      <ScrollToTopButton />
      <div className="md:hidden">
        <MobileNavbar logo={data?.site_logo || "/images/logo.png"} />
      </div>
      <div className="md:hidden">
        <MobileWidget />
      </div>

      {isLoading ? (
        <NavbarSkeleton />
      ) : (
        <>
          <Header />
          <StickyNavbar
            logo={data?.site_logo || "/images/logo.png"}
            hotline={data?.hot_line}
          />
          <CategoriesHeader />
        </>
      )}

      <Breadcrumb />

      <main className="flex flex-col py-2 grow">
        <Outlet />
      </main>

      {isLoading ? (
        <FooterSkeleton />
      ) : (
        <Footer
          site_logo={data?.site_logo || "/images/logo.png"}
          contact_phone={data?.contact_phone || ""}
          contact_email={data?.contact_email || ""}
          contact_address={data?.contact_address || ""}
          contact_address_en={data?.contact_address_en || ""}
          social_facebook={data?.social_facebook || null}
          social_twitter={data?.social_twitter || null}
          social_instagram={data?.social_instagram || null}
          whatsup2={data?.whatsup2 || ""}
          site_description={
            (language === "ar"
              ? data?.site_description_ar
              : data?.site_description) || ""
          }
        />
      )}
    </div>
  );
};

export default WebsiteLayout;
