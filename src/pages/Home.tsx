import Hero from '../components/Hero';
import AboutCard from '../components/AboutCard';
import Interests from '../components/Interests';
import PortfolioGrid from '../components/PortfolioGrid';
import MusicSection from '../components/MusicSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutCard />
      <Interests />
      <MusicSection />
      <PortfolioGrid />
    </main>
  );
}
