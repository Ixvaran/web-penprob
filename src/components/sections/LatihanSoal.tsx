import { useState } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import NormalCurve from '../charts/NormalCurve';
import StepReveal from '../interactive/StepReveal';
import { normalCDF, computeZScore, probabilityBetween, roundTo, inverseNormalCDF } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

const Soal1 = () => {
  const [show, setShow] = useState(false);
  const mean = 600;
  const stdDev = 30;

  // (a) P(X ≥ 660)
  const xA = 660;
  const zA = computeZScore(xA, mean, stdDev);
  const probA = 1 - normalCDF(zA);

  // (b) P(X ≤ 555)
  const xB = 555;
  const zB = computeZScore(xB, mean, stdDev);
  const probB = normalCDF(zB);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">Latihan 1</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Jika berat bersih suatu produk minuman kemasan berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 600 ml</strong> dan{' '}
          <strong className="text-secondary-600">standar deviasi 30 ml</strong>:
          <br /><br />
          <strong>(a)</strong> Berapa peluang mendapatkan berat 660 ml atau lebih?
          <br />
          <strong>(b)</strong> Berapa peluang mendapatkan berat 555 ml atau lebih sedikit?
        </p>
      </div>

      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm hover:opacity-90 transition-all">
          Lihat Pembahasan
        </button>
      ) : (
        <StepReveal title="Pembahasan" steps={[
          { number: 1, title: 'Bagian (a) — P(X ≥ 660)', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{660 - 600}{30} = \\frac{60}{30} = ${roundTo(zA, 2)}`} display={true} />
            <Formula latex={`P(X \\geq 660) = P(Z \\geq ${roundTo(zA, 2)}) = 1 - \\Phi(${roundTo(zA, 2)})`} display={true} />
            <Formula latex={`= 1 - ${roundTo(normalCDF(zA), 4)} = ${roundTo(probA, 4)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-primary-600">Jawaban (a): {roundTo(probA, 4)} atau {roundTo(probA * 100, 2)}%</p>
            </div>
          </div> },
          { number: 2, title: 'Bagian (b) — P(X ≤ 555)', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{555 - 600}{30} = \\frac{-45}{30} = ${roundTo(zB, 2)}`} display={true} />
            <Formula latex={`P(X \\leq 555) = P(Z \\leq ${roundTo(zB, 2)}) = \\Phi(${roundTo(zB, 2)}) = ${roundTo(probB, 4)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-primary-600">Jawaban (b): {roundTo(probB, 4)} atau {roundTo(probB * 100, 2)}%</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

const Soal2 = () => {
  const [show, setShow] = useState(false);
  const mean = 250;
  const stdDev = 15;
  const total = 1200;
  const x = 235;
  const z = computeZScore(x, mean, stdDev);
  const prob = normalCDF(z);
  const jumlah = Math.round(prob * total);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">Latihan 2</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Berat kemasan kopi berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 250 gram</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 15 gram</strong>. Jika diproduksi{' '}
          <strong className="text-accent-600">1200 kemasan</strong>, berapa banyak kemasan yang diperkirakan
          memiliki berat <strong className="text-accent-600">kurang dari 235 gram</strong>?
        </p>
      </div>

      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm hover:opacity-90 transition-all">
          Lihat Pembahasan
        </button>
      ) : (
        <StepReveal title="Pembahasan" steps={[
          { number: 1, title: 'Hitung Z-Score', content: <div className="space-y-2">
            <Formula latex={`Z = \\frac{235 - 250}{15} = \\frac{-15}{15} = ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 2, title: 'Cari Probabilitas', content: <div className="space-y-2">
            <Formula latex={`P(X < 235) = P(Z < ${roundTo(z, 2)}) = \\Phi(${roundTo(z, 2)}) = ${roundTo(prob, 4)}`} display={true} />
          </div> },
          { number: 3, title: 'Hitung Jumlah Kemasan', content: <div className="space-y-2">
            <Formula latex={`\\text{Jumlah} = ${roundTo(prob, 4)} \\times 1200 = ${roundTo(prob * total, 1)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-primary-600">Jawaban: ≈ {jumlah} kemasan</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

const Soal3 = () => {
  const [show, setShow] = useState(false);
  const mean = 35;
  const stdDev = 5;
  const a = 30;
  const b = 42;
  const zA = computeZScore(a, mean, stdDev);
  const zB = computeZScore(b, mean, stdDev);
  const prob = probabilityBetween(a, b, mean, stdDev);

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">Latihan 3</span>
          <span className="text-xs text-gray-500">Distribusi Normal</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Waktu tempuh perjalanan menuju kampus berdistribusi normal dengan{' '}
          <strong className="text-primary-600">rata-rata 35 menit</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 5 menit</strong>. Berapa persen mahasiswa
          yang memerlukan waktu perjalanan antara{' '}
          <strong className="text-accent-600">30 menit</strong> dan{' '}
          <strong className="text-accent-600">42 menit</strong>?
        </p>
      </div>

      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm hover:opacity-90 transition-all">
          Lihat Pembahasan
        </button>
      ) : (
        <StepReveal title="Pembahasan" steps={[
          { number: 1, title: 'Hitung Z-Score untuk Batas Bawah dan Atas', content: <div className="space-y-2">
            <Formula latex={`Z_1 = \\frac{30 - 35}{5} = \\frac{-5}{5} = ${roundTo(zA, 2)}`} display={true} />
            <Formula latex={`Z_2 = \\frac{42 - 35}{5} = \\frac{7}{5} = ${roundTo(zB, 2)}`} display={true} />
          </div> },
          { number: 2, title: 'Cari Probabilitas dari Tabel Z', content: <div className="space-y-2">
            <Formula latex={`P(Z < ${roundTo(zB, 2)}) = ${roundTo(normalCDF(zB), 4)}`} display={true} />
            <Formula latex={`P(Z < ${roundTo(zA, 2)}) = ${roundTo(normalCDF(zA), 4)}`} display={true} />
          </div> },
          { number: 3, title: 'Hitung Selisih dan Kesimpulan', content: <div className="space-y-2">
            <Formula latex={`P(30 < X < 42) = ${roundTo(normalCDF(zB), 4)} - ${roundTo(normalCDF(zA), 4)} = ${roundTo(prob, 4)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-primary-600">Jawaban: {roundTo(prob, 4)} atau {roundTo(prob * 100, 2)}%</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

const Soal4 = () => {
  const [show, setShow] = useState(false);
  const mean = 12;
  const stdDev = 0.4;
  const probTop = 0.10;
  const probLeft = 1 - probTop;
  const z = inverseNormalCDF(probLeft);
  const x = mean + z * stdDev;

  return (
    <div>
      <div className="glass rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">Latihan 4</span>
          <span className="text-xs text-gray-500">Invers Normal</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sebuah perusahaan perkebunan mengukur kadar air pada biji kopi yang diproduksi. Kadar air ini
          berdistribusi normal dengan <strong className="text-primary-600">rata-rata 12%</strong> dan{' '}
          <strong className="text-secondary-600">simpangan baku 0.4%</strong>. Perusahaan ingin memisahkan{' '}
          <strong className="text-accent-600">10% biji kopi dengan kadar air tertinggi</strong> untuk diproses
          dengan metode pengeringan khusus. Berapakah batas minimal kadar air (X) untuk kategori tersebut?
        </p>
      </div>

      {!show ? (
        <button onClick={() => setShow(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-semibold text-sm hover:opacity-90 transition-all">
          Lihat Pembahasan
        </button>
      ) : (
        <StepReveal title="Pembahasan" steps={[
          { number: 1, title: 'Identifikasi Informasi', content: <div className="space-y-1">
            <p>X ~ N(μ=12, σ=0.4)</p>
            <p>10% tertinggi di ekor kanan: P(X {'>'} x) = 0.10</p>
            <p>Maka P(X {'<'} x) = 1 - 0.10 = 0.90</p>
          </div> },
          { number: 2, title: 'Cari Nilai Z dari Tabel', content: <div className="space-y-2">
            <p>Cari probabilitas 0.90 di tabel Z:</p>
            <Formula latex={`\\Phi(z) = 0.90 \\Rightarrow z \\approx ${roundTo(z, 2)}`} display={true} />
          </div> },
          { number: 3, title: 'Konversi ke Nilai Riil', content: <div className="space-y-2">
            <Formula latex={`X = \\mu + Z \\cdot \\sigma = 12 + (${roundTo(z, 2)})(0.4) = ${roundTo(x, 3)}`} display={true} />
            <div className="mt-2 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="font-bold text-primary-600">Jawaban: ≈ {roundTo(x, 3)}%</p>
              <p className="text-xs text-gray-600">Batas minimal kadar air untuk kategori 10% tertinggi adalah <strong>{roundTo(x, 3)}%</strong>.</p>
            </div>
          </div> },
        ]} />
      )}
    </div>
  );
};

export default function LatihanSoal() {
  return (
    <Section
      id="latihan-soal"
      title="Latihan Soal"
      subtitle="Uji pemahaman Anda dengan 4 soal latihan beserta pembahasan"
      gradient="teal"
    >
      <div className="space-y-8">
        <Card delay={0.1}>
          <Soal1 />
        </Card>
        <Card delay={0.2}>
          <Soal2 />
        </Card>
        <Card delay={0.3}>
          <Soal3 />
        </Card>
        <Card delay={0.4}>
          <Soal4 />
        </Card>
      </div>
    </Section>
  );
}
