import Navbar from "@/components/Navbar";
import FeaturedHero from "@/components/FeaturedHero";
import PromiseTicker from "@/components/PromiseTicker";
import EventsSection from "@/components/EventsSection";
import VenuesSection from "@/components/VenuesSection";
import AboutSection from "@/components/AboutSection";
import FlexPass from "@/components/FlexPass";
import PartnerSection from "@/components/PartnerSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { featuredEvents, upcomingEvents, VENUES } from "@/lib/events";

export default function Home() {
  const events = upcomingEvents();
  return (
    <>
      <Navbar />
      <main>
        <FeaturedHero events={featuredEvents()} />
        <PromiseTicker />
        <EventsSection events={events} />
        <VenuesSection venues={VENUES} events={events} />
        <AboutSection />
        <FlexPass />
        <PartnerSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
