import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import PengertianDistribusiNormal from './components/sections/PengertianDistribusiNormal';
import Karakteristik from './components/sections/Karakteristik';
import Rumus from './components/sections/Rumus';
import DistribusiNormalBaku from './components/sections/DistribusiNormalBaku';
import InversNormalBaku from './components/sections/InversNormalBaku';
import ContohSoal from './components/sections/ContohSoal';
import LatihanSoal from './components/sections/LatihanSoal';
import Kesimpulan from './components/sections/Kesimpulan';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-deep">
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <PengertianDistribusiNormal />
          <Karakteristik />
          <Rumus />
          <DistribusiNormalBaku />
          <InversNormalBaku />
          <ContohSoal />
          <LatihanSoal />
          <Kesimpulan />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
