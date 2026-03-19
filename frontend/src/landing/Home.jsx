import HeroSection from "../components/ui/HeroSection";
import DashboardSection from "../components/ui/DashboardSection";
import FeaturesSection from "../components/ui/FeaturesSection";
import FAQSection from "../components/ui/FAQSection";
import Footer from "../components/ui/Footer";

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
