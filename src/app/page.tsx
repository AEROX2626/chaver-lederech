import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Guides from "@/components/Guides";
import Stats from "@/components/Stats";
import Stories from "@/components/Stories";
import FAQ from "@/components/FAQ";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Guides />
        <Stats />
        <Stories />
        <FAQ />
        <JoinForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
