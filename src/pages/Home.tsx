import Hero from '../components/Hero';
import AboutCard from '../components/AboutCard';
import SkillsList from '../components/SkillsList';
import PortfolioGrid from '../components/PortfolioGrid';
import MusicSection from '../components/MusicSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutCard />
      <SkillsList />
      <MusicSection />
      <PortfolioGrid />
    </main>
  );
}
