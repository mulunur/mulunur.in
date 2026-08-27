import Hero from '../components/Hero';
import AboutCard from '../components/AboutCard';
import SkillsList from '../components/SkillsList';
import PortfolioGrid from '../components/PortfolioGrid';
import MusicSection from '../components/MusicSection';
import NewSingle from '../components/NewSingle';

export default function Home() {
  return (
    <main>
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
              <NewSingle/>
  </section>

      <Hero />
      <AboutCard />
      <SkillsList />
      <MusicSection />
      <PortfolioGrid />
    </main>
  );
}
