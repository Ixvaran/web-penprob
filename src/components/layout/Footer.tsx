export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200 bg-bg-deep">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-heading font-bold text-gradient mb-3">σ Distribusi Normal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Website pembelajaran interaktif untuk memahami konsep distribusi normal,
              distribusi normal baku, dan invers normal baku dalam statistika.
              <br /><br />
              Dibuat untuk memenuhi tugas proyek mata kuliah Pengantar Probabilitas, Prodi Statistika, Kelas B
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#pengertian" className="hover:text-primary-600 transition-colors">Pengertian</a></li>
              <li><a href="#karakteristik" className="hover:text-primary-600 transition-colors">Karakteristik</a></li>
              <li><a href="#rumus" className="hover:text-primary-600 transition-colors">Rumus</a></li>
              <li><a href="#normal-baku" className="hover:text-primary-600 transition-colors">Normal Baku</a></li>
              <li><a href="#invers-normal" className="hover:text-primary-600 transition-colors">Invers Normal</a></li>
              <li><a href="#contoh-soal" className="hover:text-primary-600 transition-colors">Contoh Soal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Referensi</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><span className="hover:text-primary-600 transition-colors cursor-default">Walpole, R. E., et al. (1993). Probability and Statistics for Engineers and Scientists</span></li>
              <li><span className="hover:text-primary-600 transition-colors cursor-default">Pratikno, A. S., et al. (2020). Sebaran Peluang Acak Kontinu &amp; Distribusi Normal</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Distribusi Normal Interactive Learning
          </p>
          <p className="text-gray-600 text-xs">
            Dibuat untuk pembelajaran statistika interaktif
          </p>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-gray-500 text-xs text-center mb-3">
            Dibuat oleh:
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span className="text-gray-600 text-xs">Fahlig Aryo Jenar Maheswara</span>
            <span className="text-gray-600 text-xs">Muhammad Farhan Fauzul Adzim</span>
            <span className="text-gray-600 text-xs">Priyamitha Aristadewi</span>
            <span className="text-gray-600 text-xs">Virziankha Merdeka Darwanto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
