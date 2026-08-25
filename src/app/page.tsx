import HeroCarousel from "@/components/HeroCarousel";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import ChairmanMessage from "@/components/ChairmanMessage";
import HighlightsSection from "@/components/HighlightsSection";
import OrganisingCommittee from "@/components/OrganisingCommittee";
import VenueSection from "@/components/VenueSection";
import PlacesOfAttraction from "@/components/PlacesOfAttraction";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CountdownTimer />
      <AboutSection />
      <HighlightsSection />
      <ChairmanMessage />      
      <OrganisingCommittee />
      <VenueSection />
      <PlacesOfAttraction />
    </>
  );
}
