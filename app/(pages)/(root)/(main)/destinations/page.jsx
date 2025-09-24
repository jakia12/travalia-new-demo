import NewsletterBanner from "../components/NewsletterBanner";
import PopularDestinations from "../components/PopularDestinations";
import Banner from "./components/Banner";

const DestinationPage = () => {
  return (
    <div>
      <Banner />
      <PopularDestinations />
      <NewsletterBanner />
    </div>
  );
};

export default DestinationPage;
