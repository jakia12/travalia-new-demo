import About from "../components/About";
import NewsletterBanner from "../components/NewsletterBanner";
import AboutBanner from "./components/ABoutBanner";
import CompanySection from "./components/CompanySection";
import TravelProOffer from "./components/TravelProOffer";
import WhyChooseUs from "./components/WhyChoose";

const AboutPage = () => {
  return (
    <>
      <AboutBanner />
      <About />
      <CompanySection />
      <TravelProOffer />
      <WhyChooseUs />
      <NewsletterBanner />
    </>
  );
};

export default AboutPage;
