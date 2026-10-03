import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import HeroSection from "@/components/home/HeroSection";
import QuizSection from "@/components/home/QuizSection";
import JourneySection from "@/components/home/JourneySection";
import QuickNeedsSection from "@/components/home/QuickNeedsSection";
import HardQuestionsSection from "@/components/home/HardQuestionsSection";
import DailyStepsSection from "@/components/home/DailyStepsSection";
import TracksSection from "@/components/home/TracksSection";
import StoriesSection from "@/components/home/StoriesSection";
import PersonalHelpSection from "@/components/home/PersonalHelpSection";
import AITeaserSection from "@/components/home/AITeaserSection";
import ContinueJourney from "@/components/ContinueJourney";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <ContinueJourney />
        <QuizSection />
        <JourneySection />
        <QuickNeedsSection />
        <HardQuestionsSection />
        <DailyStepsSection />
        <TracksSection />
        <StoriesSection />
        <PersonalHelpSection />
        <AITeaserSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
