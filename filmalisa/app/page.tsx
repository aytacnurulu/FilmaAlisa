import LandingNavbar from "./(client)/landing/_components/LandingNavbar";
import HeroSection from "./(client)/landing/_components/HeroSection";
import FeatureSection from "./(client)/landing/_components/FeatureSection";
import ContactSection from "./(client)/landing/_components/ContactSection";
import FaqSection from "./(client)/landing/_components/FaqSection";
import LandingFooter from "./(client)/landing/_components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <LandingNavbar />
      <HeroSection />
      <FeatureSection
        title="Enjoy on your TV"
        description="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more. Your favourite titles on the biggest screen in the room."
        imageSrc="/landingpageImg1.svg"
        imageAlt="TV mockup showing Filmalisa"
        imagePosition="right"
        background="bg-bg"
      />
      <FeatureSection
        title="Watch everywhere"
        description="Stream on your phone, tablet, laptop, and TV. Your watchlist and history follow you seamlessly across every device you own."
        imageSrc="/landingpageImg2.svg"
        imageAlt="Devices mockup showing Filmalisa"
        imagePosition="left"
        background="bg-surface"
      />
      <FeatureSection
        title="Create profiles for kids"
        description="Send kids on adventures with their favourite characters. Filter by rating and genre to find age-appropriate titles. Safe, simple, and fun for the whole family."
        imageSrc="/landingpageImg3.svg"
        imageAlt="Kids illustration"
        imagePosition="right"
        background="bg-bg"
      />
      <ContactSection />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}
