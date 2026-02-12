import { HeroSection } from "./hero-section";
import { IntroSection } from "./intro-section";
import { ReviewSection } from "./review-section";
import { ServiceSection } from "./service-section";
import { LocationSection } from "./location-section";

export const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <IntroSection />
      <ReviewSection />
      <ServiceSection />
      <LocationSection />
    </div>
  );
};
