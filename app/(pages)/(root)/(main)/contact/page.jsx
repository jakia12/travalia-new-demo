import NewsletterBanner from "../components/NewsletterBanner";
import ContactBanner from "./components/ContactBanner";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import GoogleMap from "./components/GoogleMap";

const ContactPage = () => {
  return (
    <>
      <ContactBanner />
      <ContactInfo />
      <ContactForm />
      <GoogleMap />
      <NewsletterBanner />
    </>
  );
};

export default ContactPage;
