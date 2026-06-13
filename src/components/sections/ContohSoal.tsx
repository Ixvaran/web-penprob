import { useState, type KeyboardEvent } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import NormalCurve from '../charts/NormalCurve';
import StepReveal from '../interactive/StepReveal';
import ProbabilitySlider from '../interactive/ProbabilitySlider';
import { normalCDF, computeZScore, probabilityBetween, roundTo, inverseNormalCDF } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

/* ====================================================================
   TAB 1: DISTRIBUSI NORMAL (3 Contoh)
   ==================================================================== */

const ContohNormal1 = () => {
  const [show, setShow] = useState(false);
  const mean = 500;
  const stdDev = 80;
  const x = 620;
  const z = computeZScore(x, mean, stdDev);
  const prob = 1 - normalCDF(z);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-primary-500/15 text-primary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-primary-600">Contoh 1.1:</span> Peluang Lebih Dari Nilai Tertentu
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Untuk distribusi normal dengan <strong className="text-primary-600">μ = 500</strong> dan{' '}
          <strong className="text-secondary-600">σ = 80</strong>, hitunglah peluang bahwa X mengambil
          sebuah nilai <strong className="text-accent-600">lebih dari 620</strong>!
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={x} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x, label: '620', color: '#fbbf24' }, { x: mean, label: 'μ=500', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm hover:from-primary-500 hover:to-primary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=500, σ=80)</p>
            <p>Ditanya: P(X {'>'} 620)</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <p>Ubah X ke Z:</p>
            <Formula latex={`Z = \\frac{X - \\mu}{\\sigma} = \\frac{620 - 500}{80} = \\frac{120}{80} = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari Probabilitas dari Tabel Z', content: <div className="space-y-2">
            <p>Karena yang dicari P(X {'>'} 620), maka dicari P(Z {'>'} 1.5):</p>
            <Formula latex={`P(Z > 1.5) = 1 - \\Phi(1.5) = 1 - ${roundTo(normalCDF(z), 4)} = ${roundTo(prob, 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">= {roundTo(prob, 4)} atau {roundTo(prob * 100, 2)}%</p>
            <p className="text-xs text-gray-600">Jadi, peluang bahwa X mengambil nilai lebih dari 620 adalah <strong>{roundTo(prob, 4)}</strong> atau <strong>{roundTo(prob * 100, 2)}%</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohNormal2 = () => {
  const [show, setShow] = useState(false);
  const mean = 4000;
  const stdDev = 250;
  const x = 3600;
  const z = computeZScore(x, mean, stdDev);
  const prob = normalCDF(z);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-primary-500/15 text-primary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-primary-600">Contoh 1.2:</span> Umur Lampu LED
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Rataan umur lampu LED adalah <strong className="text-primary-600">4000 jam</strong> dengan simpangan baku{' '}
          <strong className="text-secondary-600">250 jam</strong>. Bila umur lampu tersebut berdistribusi normal,
          hitunglah peluang sebuah lampu LED memiliki umur{' '}
          <strong className="text-accent-600">kurang dari 3600 jam</strong>!
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeRight={x} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x, label: '3600', color: '#fbbf24' }, { x: mean, label: 'μ=4000', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm hover:from-primary-500 hover:to-primary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=4000, σ=250)</p>
            <p>Ditanya: P(X {'<'} 3600)</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{3600 - 4000}{250} = \\frac{-400}{250} = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari Probabilitas dari Tabel Z', content: <div className="space-y-2">
            <p>Dari tabel Z untuk Z = {roundTo(z, 2)}:</p>
            <Formula latex={`P(Z < ${roundTo(z, 2)}) = \\Phi(${roundTo(z, 2)}) = ${roundTo(prob, 4)}`} display={true} />
            <p className="text-xs text-gray-500">Atau menggunakan sifat simetri: P(Z {'<'} -1.6) = P(Z {'>'} 1.6) = 1 - Φ(1.6)</p>
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">= {roundTo(prob * 100, 2)}%</p>
            <p className="text-xs text-gray-600">Jadi, peluang sebuah lampu LED memiliki umur kurang dari 3600 jam adalah <strong>{roundTo(prob, 4)}</strong> atau <strong>{roundTo(prob * 100, 2)}%</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohNormal3 = () => {
  const [show, setShow] = useState(false);
  const mean = 300;
  const stdDev = 15;
  const a = 275;
  const b = 320;
  const zA = -1.67;
  const zB = 1.33;
  const probA = normalCDF(zA);
  const probB = normalCDF(zB);
  const prob = probB - probA;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-primary-500/15 text-primary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-primary-600">Contoh 1.3:</span> Panjang Besi Beton
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Suatu perusahaan memproduksi besi beton yang panjangnya berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rataan 300 cm</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 15 cm</strong>. Hitunglah peluang
          sebuah besi beton memiliki panjang antara{' '}
          <strong className="text-accent-600">275 cm</strong> dan{' '}
          <strong className="text-accent-600">320 cm</strong>!
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={a} shadeRight={b} shadeColor={CHART_COLORS.secondaryFill}
          annotations={[{ x: a, label: '275', color: '#2dd4bf' }, { x: b, label: '320', color: '#2dd4bf' }, { x: mean, label: 'μ=300', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm hover:from-primary-500 hover:to-primary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=300, σ=15)</p>
            <p>Ditanya: P(275 {'<'} X {'<'} 320)</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score untuk Batas Bawah dan Atas', content: <div className="space-y-2">
            <Formula latex={`Z_1 = \\frac{275 - 300}{15} = \\frac{-25}{15} = ${roundTo(zA, 2)}`} display={true} />
            <Formula latex={`Z_2 = \\frac{320 - 300}{15} = \\frac{20}{15} = ${roundTo(zB, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari Probabilitas dari Tabel Z', content: <div className="space-y-2">
            <Formula latex={`P(Z < ${roundTo(zB, 2)}) = ${roundTo(normalCDF(zB), 4)}`} display={true} />
            <Formula latex={`P(Z < ${roundTo(zA, 2)}) = ${roundTo(normalCDF(zA), 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Hitung Selisih dan Kesimpulan', content: <div className="space-y-2">
            <Formula latex={`P(275 < X < 320) = ${roundTo(normalCDF(zB), 4)} - ${roundTo(normalCDF(zA), 4)} = ${roundTo(prob, 4)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-lg text-primary-600">= {roundTo(prob * 100, 2)}%</p>
              <p className="text-xs text-gray-600">Jadi peluang sebuah besi beton memiliki panjang antara 275 cm dan 320 cm adalah <strong>{roundTo(prob, 4)}</strong> atau <strong>{roundTo(prob * 100, 2)}%</strong>.</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

/* ====================================================================
   TAB 2: DISTRIBUSI NORMAL BAKU (3 Contoh)
   ==================================================================== */

const ContohBaku1 = () => {
  const [show, setShow] = useState(false);
  const mean = 62;
  const stdDev = 8;
  const x = 68;
  const z = computeZScore(x, mean, stdDev);
  const prob = normalCDF(z);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-secondary-500/15 text-secondary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-secondary-600">Contoh 2.1:</span> Berat Badan Mahasiswa
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Berat badan mahasiswa berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 62 kg</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 8 kg</strong>. Hitung peluang
          seorang mahasiswa memiliki berat badan{' '}
          <strong className="text-accent-600">kurang dari 68 kg</strong>.
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeRight={x} shadeColor={CHART_COLORS.secondaryFill}
          annotations={[{ x, label: '68 kg', color: '#2dd4bf' }, { x: mean, label: 'μ=62', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white font-semibold text-sm hover:from-secondary-500 hover:to-secondary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=62, σ=8)</p>
            <p>Ditanya: P(X {'<'} 68)</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{68 - 62}{8} = \\frac{6}{8} = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari dari Tabel Z', content: <div className="space-y-2">
            <p>Dari tabel Z diperoleh:</p>
            <Formula latex={`P(Z < ${roundTo(z, 2)}) = \\Phi(${roundTo(z, 2)}) = ${roundTo(prob, 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">= {roundTo(prob, 4)}</p>
            <p className="text-xs text-gray-600">Jadi, peluang seorang mahasiswa memiliki berat badan kurang dari 68 kg adalah <strong>{roundTo(prob, 4)}</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohBaku2 = () => {
  const [show, setShow] = useState(false);
  const mean = 70;
  const stdDev = 10;
  const x = 82;
  const totalPeserta = 500;
  const z = computeZScore(x, mean, stdDev);
  const probRight = 1 - normalCDF(z);
  const jumlahOrang = Math.floor(probRight * totalPeserta);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-secondary-500/15 text-secondary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-secondary-600">Contoh 2.2:</span> Nilai Tes Matematika
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Nilai tes matematika berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 70</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 10</strong>. Jika terdapat{' '}
          <strong className="text-accent-600">500 peserta ujian</strong>, berapa orang yang diperkirakan
          memperoleh nilai <strong className="text-accent-600">lebih dari 82</strong>?
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={x} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x, label: '82', color: '#fbbf24' }, { x: mean, label: 'μ=70', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white font-semibold text-sm hover:from-secondary-500 hover:to-secondary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=70, σ=10), jumlah peserta = 500</p>
            <p>Ditanya: Berapa orang yang mendapat nilai {'>'} 82?</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{82 - 70}{10} = \\frac{12}{10} = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari Probabilitas dari Tabel Z', content: <div className="space-y-2">
            <p>Dari tabel Z diperoleh Φ(1.2):</p>
            <Formula latex={`\\Phi(${roundTo(z, 2)}) = ${roundTo(normalCDF(z), 4)}`} display={true} />
            <p>Gunakan sifat komplemen untuk mencari P(X {'>'} 82):</p>
            <Formula latex={`P(X > 82) = 1 - \\Phi(${roundTo(z, 2)}) = 1 - ${roundTo(normalCDF(z), 4)} = ${roundTo(probRight, 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Hitung Jumlah Orang dan Kesimpulan', content: <div className="space-y-2">
            <Formula latex={`\\text{Jumlah} = ${roundTo(probRight, 4)} \\times 500 = ${roundTo(probRight * 500, 1)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-lg text-primary-600">≈ {jumlahOrang} peserta</p>
              <p className="text-xs text-gray-600">Jadi, diperkirakan terdapat <strong>{jumlahOrang} peserta</strong> yang memperoleh nilai lebih dari 82.</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohBaku3 = () => {
  const [show, setShow] = useState(false);
  const mean = 4;
  const stdDev = 0.6;
  const a = 3.5;
  const b = 4.8;
  // Z dibulatkan ke 2 desimal sesuai tabel Z
  const zA = -0.83;
  const zB = 1.33;
  const probA = normalCDF(zA);
  const probB = normalCDF(zB);
  const prob = probB - probA;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-secondary-500/15 text-secondary-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Distribusi Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-secondary-600">Contoh 2.3:</span> Umur Aki Mobil
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Umur aki mobil berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 4 tahun</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 0.6 tahun</strong>. Berapa persen aki
          yang memiliki umur antara{' '}
          <strong className="text-accent-600">3.5 tahun</strong> dan{' '}
          <strong className="text-accent-600">4.8 tahun</strong>?
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={a} shadeRight={b} shadeColor={CHART_COLORS.secondaryFill}
          annotations={[{ x: a, label: '3.5', color: '#2dd4bf' }, { x: b, label: '4.8', color: '#2dd4bf' }, { x: mean, label: 'μ=4', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white font-semibold text-sm hover:from-secondary-500 hover:to-secondary-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>Diketahui X ~ N(μ=4, σ=0.6)</p>
            <p>Ditanya: P(3.5 {'<'} X {'<'} 4.8)</p>
          </div> },
          { number: 2, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <Formula latex={`Z_1 = \\frac{3.5 - 4}{0.6} = \\frac{-0.5}{0.6} = ${roundTo(zA, 2)}`} display={true} />
            <Formula latex={`Z_2 = \\frac{4.8 - 4}{0.6} = \\frac{0.8}{0.6} = ${roundTo(zB, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Cari dari Tabel Z', content: <div className="space-y-2">
            <Formula latex={`P(Z < ${roundTo(zB, 2)}) = ${roundTo(normalCDF(zB), 4)}`} display={true} />
            <Formula latex={`P(Z < ${roundTo(zA, 2)}) = ${roundTo(normalCDF(zA), 4)}`} display={true} />
            <Formula latex={`P(${roundTo(zA, 2)} < Z < ${roundTo(zB, 2)}) = ${roundTo(normalCDF(zB), 4)} - ${roundTo(normalCDF(zA), 4)} = ${roundTo(prob, 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">= {roundTo(prob * 100, 2)}%</p>
            <p className="text-xs text-gray-600">Jadi, persentase aki yang memiliki umur antara 3.5 tahun dan 4.8 tahun adalah <strong>{roundTo(prob * 100, 2)}%</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

/* ====================================================================
   TAB 3: INVERS NORMAL BAKU (3 Contoh)
   ==================================================================== */

const ContohInvers1 = () => {
  const [show, setShow] = useState(false);
  const mean = 3;
  const stdDev = 0.005;
  const probRight = 0.0228;
  const probLeft = 1 - probRight;
  const z = inverseNormalCDF(probLeft);
  const x = mean + z * stdDev;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-accent-400/20 text-accent-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Invers Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-accent-600">Contoh 3.1:</span> Batas Diameter Bantalan Bola
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sebuah pabrik otomotif memproduksi bantalan bola dengan diameter berdistribusi normal{' '}
          <strong className="text-primary-600">μ = 3 cm</strong> dan{' '}
          <strong className="text-secondary-600">σ = 0.005 cm</strong>. Manajemen memutuskan bahwa{' '}
          <strong className="text-accent-600">2.28%</strong> dari produk dengan diameter terbesar harus
          dilebur kembali. Berapakah batas minimal diameter yang harus dilebur?
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={x} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x, label: `x≈${roundTo(x, 3)}`, color: '#fbbf24' }, { x: mean, label: 'μ=3', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-semibold text-sm hover:from-accent-500 hover:to-accent-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>X ~ N(μ=3, σ=0.005)</p>
            <p>Dicari batas x dimana P(X {'>'} x) = 2.28% = 0.0228</p>
            <p>Maka P(X {'<'} x) = 1 - 0.0228 = 0.9772</p>
          </div> },
          { number: 2, title: 'Cari Nilai Z dari Tabel', content: <div className="space-y-2">
            <p>Cari probabilitas 0.9772 di tabel Z:</p>
            <Formula latex={`\\Phi(z) = 0.9772 \\Rightarrow z = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Konversi ke Nilai Riil', content: <div className="space-y-2">
            <Formula latex={`X = \\mu + Z \\cdot \\sigma = 3 + (${roundTo(z, 2)})(0.005) = ${roundTo(x, 4)}`} display={true} />
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">≈ {roundTo(x, 2)} cm</p>
            <p className="text-xs text-gray-600">Batas minimal diameter bantalan bola yang harus dilebur kembali adalah <strong>{roundTo(x, 2)} cm</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohInvers2 = () => {
  const [show, setShow] = useState(false);
  const mean = 24;
  const stdDev = 3.8;
  const x1 = 19.1;
  const probRentang = 0.7515;
  const z1 = computeZScore(x1, mean, stdDev);
  const probX1 = normalCDF(z1);
  const probLeft = probX1 + probRentang;
  const z2 = inverseNormalCDF(probLeft);
  const x2 = mean + z2 * stdDev;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-accent-400/20 text-accent-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Invers Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-accent-600">Contoh 3.2:</span> Batas Waktu Pengiriman
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sebuah perusahaan logistik berbasis digital melayani pengiriman paket antarkota. Waktu pengiriman paket
          berdistribusi normal dengan <strong className="text-primary-600">μ = 24 jam</strong> dan{' '}
          <strong className="text-secondary-600">σ = 3.8 jam</strong>. Perusahaan ingin mengevaluasi kurir yang berada
          di performa menengah menjelang batas keterlambatan. Manajer operasional ingin mengetahui batas waktu (x₂)
          yang membatasi kelompok kurir yang memiliki waktu pengiriman antara{' '}
          <strong className="text-accent-600">19.1 jam</strong> hingga batas bawah kelompok{' '}
          <strong className="text-accent-600">15% kurir terlambat</strong>. Jika diketahui probabilitas kurir yang
          berada di rentang waktu tersebut adalah <strong className="text-accent-600">0.7515</strong>, berapakah
          batas bawah waktu pengiriman (x₂) untuk kelompok 15% kurir terlambat tersebut?
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeLeft={x2} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x: x1, label: '19.1', color: '#2dd4bf' }, { x: x2, label: `x₂≈${roundTo(x2, 2)}`, color: '#fbbf24' }, { x: mean, label: 'μ=24', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-semibold text-sm hover:from-accent-500 hover:to-accent-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>X ~ N(μ=24, σ=3.8)</p>
            <p>Diketahui P(19.1 {'<'} X {'<'} x₂) = 0.7515</p>
            <p>Dicari x₂ yang membatasi kelompok 15% kurir terlambat (ekor kanan)</p>
          </div> },
          { number: 2, title: 'Transformasi Titik Bawah (x₁=19.1) ke Z', content: <div className="space-y-2">
            <Formula latex={`Z_1 = \\frac{19.1 - 24}{3.8} = \\frac{-4.9}{3.8} = ${roundTo(z1, 2)}`} display={true} />
            <p>Dari tabel Z, luas kumulatif di sebelah kiri Z₁ = {roundTo(z1, 2)} adalah:</p>
            <Formula latex={`\\Phi(${roundTo(z1, 2)}) = ${roundTo(probX1, 4)}`} display={true} />
          </div> },
          { number: 3, title: 'Verifikasi dan Cari P(X < x₂)', content: <div className="space-y-2">
            <p>Sesuai hukum penjumlahan peluang kontinu:</p>
            <Formula latex={`P(X < x_2) = P(X < 19.1) + P(19.1 < X < x_2) = ${roundTo(probX1, 4)} + ${probRentang} = ${roundTo(probLeft, 4)}`} display={true} />
            <p>Area sisa di sebelah kanan x₂: 1 - {roundTo(probLeft, 4)} = {roundTo(1 - probLeft, 4)} (15% kurir terlambat ✓)</p>
          </div> },
          { number: 4, title: 'Cari Z₂ dan Konversi ke Jam Riil', content: <div className="space-y-2">
            <p>Cari probabilitas {roundTo(probLeft, 4)} di tabel Z:</p>
            <Formula latex={`\\Phi(z_2) = ${roundTo(probLeft, 4)} \\Rightarrow z_2 \\approx ${roundTo(z2, 2)}`} display={true} />
            <Formula latex={`x_2 = \\mu + Z_2 \\cdot \\sigma = 24 + (${roundTo(z2, 2)})(${stdDev}) = ${roundTo(x2, 2)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-lg text-primary-600">≈ {roundTo(x2, 2)} jam</p>
              <p className="text-xs text-gray-600">Batas bawah waktu pengiriman untuk kelompok 15% kurir terlambat adalah <strong>{roundTo(x2, 2)} jam</strong> (sekitar {Math.floor(roundTo(x2, 2))} jam {Math.round((roundTo(x2, 2) % 1) * 60)} menit).</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

const ContohInvers3 = () => {
  const [show, setShow] = useState(false);
  const mean = 800;
  const stdDev = 40;
  const probClaim = 0.03;
  const z = inverseNormalCDF(probClaim);
  const x = mean + z * stdDev;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-accent-400/20 text-accent-600 text-xs font-bold">Soal</span>
          <span className="text-xs text-gray-500">Invers Normal Baku</span>
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-3">
          <span className="text-accent-600">Contoh 3.3:</span> Masa Garansi Lampu LED
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Perusahaan elektronik memproduksi lampu LED industri dengan{' '}
          <strong className="text-primary-600">μ = 800 jam</strong> dan{' '}
          <strong className="text-secondary-600">σ = 40 jam</strong>. Agar tidak rugi, manajemen menetapkan
          maksimal <strong className="text-accent-600">3%</strong> dari total lampu yang boleh diklaim garansi.
          Berapa jamkah masa garansi yang harus dicantumkan?
        </p>
      </div>
      <div className="bg-white/[0.02] rounded-xl p-4 mb-5">
        <NormalCurve mean={mean} stdDev={stdDev} shadeRight={x} shadeColor={CHART_COLORS.primaryFill}
          annotations={[{ x, label: `x≈${roundTo(x, 0)}`, color: '#fbbf24' }, { x: mean, label: 'μ=800', color: '#3b82f6' }]}
          height={220} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-semibold text-sm hover:from-accent-500 hover:to-accent-400 transition-all">
          Lihat Penyelesaian
        </button>
      ) : (
        <StepReveal steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>X ~ N(μ=800, σ=40)</p>
            <p>Lampu cepat rusak di ujung kiri kurva</p>
            <p>P(X {'<'} x) = 3% = 0.03</p>
          </div> },
          { number: 2, title: 'Cari Nilai Z dari Tabel', content: <div className="space-y-2">
            <p>Cari probabilitas 0.03 di tabel Z:</p>
            <Formula latex={`\\Phi(z) = 0.03 \\Rightarrow z \\approx ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Konversi ke Nilai Riil', content: <div className="space-y-2">
            <Formula latex={`X = \\mu + Z \\cdot \\sigma = 800 + (${roundTo(z, 2)})(40) = ${roundTo(x, 1)}`} display={true} />
          </div> },
          { number: 4, title: 'Kesimpulan', content: <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="font-bold text-lg text-primary-600">≈ {roundTo(x, 1)} jam</p>
            <p className="text-xs text-gray-600">Masa garansi yang harus dicantumkan pada kemasan adalah <strong>{roundTo(x, 1)} jam</strong>.</p>
          </div> },
        ]} />
      )}
    </div>
  );
};

/* ====================================================================
   MAIN SECTION
   ==================================================================== */

export default function ContohSoal() {
  const [activeTab, setActiveTab] = useState<'normal' | 'baku' | 'invers'>('normal');
  const tabs = [
    { id: 'normal' as const, label: 'Distribusi Normal', desc: '3 Contoh' },
    { id: 'baku' as const, label: 'Normal Baku', desc: '3 Contoh' },
    { id: 'invers' as const, label: 'Invers Normal', desc: '3 Contoh' },
  ];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    document.getElementById(`contoh-tab-${nextTab.id}`)?.focus();
  };

  return (
    <Section
      id="contoh-soal"
      title="Contoh Soal &amp; Pembahasan"
      subtitle="Pelajari melalui 9 contoh soal dengan pembahasan langkah demi langkah"
      gradient="dark"
    >
      {/* Probability Calculator */}
      <Card delay={0.1} variant="glass" className="mb-8">
        <h3 className="text-lg font-heading font-bold text-gray-900 text-center mb-2">
          🧮 Coba Hitung Probabilitas Sendiri
        </h3>
        <p className="text-gray-600 text-xs text-center mb-6">
          Atur parameter mean dan standar deviasi, lalu geser batas a dan b untuk melihat probabilitas secara real-time
        </p>
        <ProbabilitySlider />
      </Card>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="glass-strong rounded-2xl p-1 inline-flex" role="tablist" aria-label="Pilih topik contoh soal">
          {tabs.map((tab, index) => (
            <button
              id={`contoh-tab-${tab.id}`}
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              aria-controls={`contoh-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 font-semibold shadow-sm ring-1 ring-primary-500/20'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="block">{tab.label}</span>
              <span className="block text-[10px] opacity-60">{tab.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div id={`contoh-panel-${activeTab}`} role="tabpanel" tabIndex={0} aria-labelledby={`contoh-tab-${activeTab}`}>
        {activeTab === 'normal' && (
          <div className="space-y-8">
            <ContohNormal1 />
            <ContohNormal2 />
            <ContohNormal3 />
          </div>
        )}
        {activeTab === 'baku' && (
          <div className="space-y-8">
            <ContohBaku1 />
            <ContohBaku2 />
            <ContohBaku3 />
          </div>
        )}
        {activeTab === 'invers' && (
          <div className="space-y-8">
            <ContohInvers1 />
            <ContohInvers2 />
            <ContohInvers3 />
          </div>
        )}
      </div>
    </Section>
  );
}
