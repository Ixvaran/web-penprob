/**
 * Normal Distribution Math Engine
 *
 * Provides PDF, CDF, inverse CDF (quantile function),
 * Z-score calculation, and probability computations.
 */

/**
 * Standard normal PDF (Probability Density Function)
 * φ(z) = (1/√(2π)) * e^(-z²/2)
 */
export function normalPDF(z: number): number {
  return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}

/**
 * General normal PDF
 * f(x) = (1/(σ√(2π))) * e^(-(x-μ)²/(2σ²))
 */
export function normalPDFGeneral(x: number, mean: number, stdDev: number): number {
  if (stdDev <= 0) return 0;
  const z = (x - mean) / stdDev;
  return normalPDF(z) / stdDev;
}

/**
 * Standard normal CDF (Cumulative Distribution Function)
 * Uses Abramowitz and Stegun approximation — error < 2.5×10⁻⁴
 * Φ(z) = P(Z ≤ z)
 */
export function normalCDF(z: number): number {
  if (z > 6) return 1;
  if (z < -6) return 0;

  const b0 = 0.2316419;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;

  const t = 1 / (1 + b0 * Math.abs(z));
  const poly = t * (b1 + t * (b2 + t * (b3 + t * (b4 + t * b5))));
  const cdf = 1 - normalPDF(z) * poly;

  return z >= 0 ? cdf : 1 - cdf;
}

/**
 * General normal CDF: P(X ≤ x) for X ~ N(μ, σ²)
 */
export function normalCDFGeneral(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / stdDev;
  return normalCDF(z);
}

/**
 * Inverse normal CDF (quantile function)
 * Uses rational approximation — very accurate for p ∈ [0.0001, 0.9999]
 * Returns z such that Φ(z) = p
 */
export function inverseNormalCDF(p: number): number {
  if (p <= 0) return -6;
  if (p >= 1) return 6;

  // Rational approximation
  const a1 = -3.969683028665376e+01;
  const a2 = 2.209460984245205e+02;
  const a3 = -2.759285104469687e+02;
  const a4 = 1.383577518672690e+02;
  const a5 = -3.066479806614716e+01;
  const a6 = 2.506628277459239e+00;

  const b1 = -5.447609879822406e+01;
  const b2 = 1.615858368580409e+02;
  const b3 = -1.556989798598866e+02;
  const b4 = 6.680131188771972e+01;
  const b5 = -1.328068155288572e+01;

  const c1 = -7.784894002430293e-03;
  const c2 = -3.223964580411365e-01;
  const c3 = -2.400758277161838e+00;
  const c4 = -2.549732539343734e+00;
  const c5 = 4.374664141464968e+00;
  const c6 = 2.938163982698783e+00;

  const d1 = 7.784695709041462e-03;
  const d2 = 3.224671290700398e-01;
  const d3 = 2.445134137142996e+00;
  const d4 = 3.754408661907416e+00;

  let z: number;

  const p_low = 0.02425;
  const p_high = 1 - p_low;

  if (p < p_low) {
    // Lower region
    const q = Math.sqrt(-2 * Math.log(p));
    z = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= p_high) {
    // Central region
    const q = p - 0.5;
    const r = q * q;
    z = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
        (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    // Upper region
    const q = Math.sqrt(-2 * Math.log(1 - p));
    z = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return z;
}

/**
 * Compute Z-score: Z = (X - μ) / σ
 */
export function computeZScore(x: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (x - mean) / stdDev;
}

/**
 * Compute probability P(a < X < b) for X ~ N(μ, σ²)
 */
export function probabilityBetween(
  a: number, b: number,
  mean: number, stdDev: number
): number {
  return normalCDFGeneral(b, mean, stdDev) - normalCDFGeneral(a, mean, stdDev);
}

/**
 * Generate points for the normal distribution curve
 */
export function generateCurvePoints(
  mean: number,
  stdDev: number,
  points: number = 200
): { x: number; y: number }[] {
  const min = mean - 4 * stdDev;
  const max = mean + 4 * stdDev;
  const step = (max - min) / points;
  const data: { x: number; y: number }[] = [];

  for (let i = 0; i <= points; i++) {
    const x = min + i * step;
    data.push({ x, y: normalPDFGeneral(x, mean, stdDev) });
  }

  return data;
}

/**
 * Round to decimal places
 */
export function roundTo(value: number, decimals: number = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
