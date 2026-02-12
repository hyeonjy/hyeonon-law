export * from "./hero-section";
export * from "./attorney-section";
export * from "./values-section";

import { HeroSection } from "./hero-section";
import { AttorneySection } from "./attorney-section";
import { ValuesSection } from "./values-section";

export default function About() {
  return (
    <>
      <HeroSection />
      <AttorneySection />
      <ValuesSection />
    </>
  );
}
