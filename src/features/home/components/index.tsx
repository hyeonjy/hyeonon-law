import { HeroSection } from "./hero-section";
import { IntroSection } from "./intro-section";
import { ReviewSection } from "./review-section";
import { ServiceSection } from "./service-section";
import { LocationSection } from "./location-section";

export const dynamic = "force-static";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ReviewSection />
      <ServiceSection />
      <LocationSection />
    </>
  );
};
