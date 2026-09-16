import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import FlexPass from "@/components/FlexPass";
import EventsLineup from "@/components/EventsLineup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Manifesto />
      <FlexPass />
      <EventsLineup />
      <Footer />
    </main>
  );
}
