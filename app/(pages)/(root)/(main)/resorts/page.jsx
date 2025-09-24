import NewsletterBanner from "../components/NewsletterBanner";
import ToursBanner from "./components/TourBanner";
import TourPackages from "./components/TourPackages";

const TourPage = () => {
  return (
    <>
      <ToursBanner />
      <TourPackages />
      <NewsletterBanner />
    </>
  );
};

export default TourPage;
