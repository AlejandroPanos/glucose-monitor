import HeroSection from "../../components/public/Landing/HeroSection";
import DashboardSection from "../../components/public/Landing/DashboardSection";
import FeaturesSection from "../../components/public/Landing/FeaturesSection";
import FAQSection from "../../components/public/Landing/FAQSection";
import Footer from "../../components/public/Landing/Footer";

const Home = () => {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-10">
        <HeroSection />
        <DashboardSection />
        <FeaturesSection />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
