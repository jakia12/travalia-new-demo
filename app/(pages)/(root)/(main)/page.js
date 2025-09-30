import Gallery from "./components/Gallery";
import MaldivesOffersCTA from "./components/MaldivesOffersCTA";
import NewsletterBanner from "./components/NewsletterBanner";
import OfferCardSec from "./components/OfferCardSec";
import PackagesSection from "./components/PackagesSection";
import ResortShowcase from "./components/ResortShowcase";
import TravelHero from "./components/TravelHero";

export default function Home() {
  return (
    <>
      <TravelHero />
      {/* <WhoWeAre /> */}
      {/* <PopularDestinations /> */}
      {/* <FeaturedSection /> */}
      <PackagesSection />
      <ResortShowcase />
      <OfferCardSec />
      <Gallery />
      <MaldivesOffersCTA />
      <NewsletterBanner />
    </>
  );
}
