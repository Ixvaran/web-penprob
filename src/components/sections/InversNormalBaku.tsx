import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import InverseNormalCalc from '../interactive/InverseNormalCalc';

export default function InversNormalBaku() {
  return (
    <Section
      id="invers-normal"
      title="Invers Normal Baku"
      subtitle="Mencari nilai Z dari suatu probabilitas (kuantil)"
      gradient="purple"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card delay={0.1}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Apa itu Invers Normal?</h3>
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong className="text-primary-600">Invers Normal Baku</strong> (juga disebut
              <strong className="text-secondary-600"> fungsi kuantil</strong>) adalah kebalikan dari
              fungsi distribusi kumulatif (CDF).
            </p>
            <p>
              Jika CDF Φ(z) memberikan probabilitas P(Z ≤ z) dari suatu nilai z, maka:
            </p>
            <div className="glass rounded-xl p-4 my-4">
              <p className="text-xs text-gray-600 mb-2">
                Invers CDF (fungsi kuantil):
              </p>
              <Formula latex={String.raw`\Phi^{-1}(p) = z \quad \text{di mana} \quad P(Z \leq z) = p`} display={true} />
            </div>
            <p>
              Dengan kata lain, kita mencari nilai z sedemikian sehingga luas area dari -∞ sampai z
              sama dengan probabilitas p yang diketahui.
            </p>
          </div>
        </Card>

        <Card delay={0.2}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Penggunaan Invers Normal</h3>
          <div className="space-y-4">
            <div className="glass rounded-lg p-4">
              <p className="text-sm font-semibold text-primary-600 mb-2">📊 Interval Kepercayaan</p>
              <p className="text-xs text-gray-600 mb-2">Mencari nilai kritis {"z_{α/2}"} untuk confidence interval:</p>
              <Formula latex={String.raw`z_{\alpha/2} = \Phi^{-1}\left(1 - \frac{\alpha}{2}\right)`} display={true} />
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm font-semibold text-primary-600 mb-2">📈 Uji Hipotesis</p>
              <p className="text-xs text-gray-600 mb-2">Menentukan daerah kritis berdasarkan tingkat signifikansi:</p>
              <Formula latex={String.raw`z_{\alpha} = \Phi^{-1}(1 - \alpha)`} display={true} />
            </div>
            <div className="glass rounded-lg p-4">
              <p className="text-sm font-semibold text-primary-600 mb-2">🎯 Persentil</p>
              <p className="text-xs text-gray-600 mb-2">Mencari nilai yang memisahkan persentase tertentu data:</p>
              <Formula latex={String.raw`Q_p = \mu + \Phi^{-1}(p) \cdot \sigma`} display={true} />
            </div>
          </div>
        </Card>
      </div>

      {/* Interactive Calculator */}
      <Card delay={0.3} variant="">
        <InverseNormalCalc />
      </Card>

      {/* Table example */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card delay={0.4}>
          <h4 className="text-base font-heading font-bold text-gray-900 mb-4">Nilai-nilai Kritis Umum</h4>
          <div className="space-y-2">
            {[
              { p: '0.90', z: '1.2816', use: 'z₀.₁₀ (CI 80%)' },
              { p: '0.95', z: '1.6449', use: 'z₀.₀₅ (CI 90%)' },
              { p: '0.975', z: '1.9600', use: 'z₀.₀₂₅ (CI 95%)' },
              { p: '0.99', z: '2.3263', use: 'z₀.₀₁ (CI 98%)' },
              { p: '0.995', z: '2.5758', use: 'z₀.₀₀₅ (CI 99%)' },
              { p: '0.999', z: '3.0902', use: 'z₀.₀₀₁ (CI 99.8%)' },
            ].map((row) => (
              <div key={row.p} className="flex items-center justify-between glass rounded-lg px-4 py-3">
                <div>
                  <span className="text-xs text-gray-600">Φ({row.z}) = </span>
                  <span className="text-sm font-semibold text-secondary-600">{row.p}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-primary-600">{row.z}</span>
                  <p className="text-[10px] text-gray-500">{row.use}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={0.5}>
          <h4 className="text-base font-heading font-bold text-gray-900 mb-4">Hubungan Invers &amp; CDF</h4>
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2">CDF → Invers:</p>
              <Formula latex={String.raw`\Phi(z) = p \iff z = \Phi^{-1}(p)`} display={true} />
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2">Sifat simetri:</p>
              <Formula latex={String.raw`\Phi^{-1}(1-p) = -\Phi^{-1}(p)`} display={true} />
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2">Untuk median:</p>
              <Formula latex={String.raw`\Phi^{-1}(0.5) = 0`} display={true} />
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
