import { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateCurvePoints, normalPDFGeneral } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

interface NormalCurveProps {
  mean: number;
  stdDev: number;
  shadeLeft?: number;
  shadeRight?: number;
  shadeColor?: string;
  showLabels?: boolean;
  height?: number;
  annotations?: { x: number; label: string; color?: string }[];
  className?: string;
  ariaLabel?: string;
}

export default function NormalCurve({
  mean,
  stdDev,
  shadeLeft,
  shadeRight,
  shadeColor = CHART_COLORS.shadeFill,
  showLabels = true,
  height = 300,
  annotations = [],
  className = '',
  ariaLabel,
}: NormalCurveProps) {
  const titleId = useId();
  const descId = useId();
  const width = 700;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = useMemo(() => generateCurvePoints(mean, stdDev, 200), [mean, stdDev]);
  const xMin = mean - 4 * stdDev;
  const xMax = mean + 4 * stdDev;

  const scaleX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * chartW;
  const scaleY = (y: number) => padding.top + chartH - (y / normalPDFGeneral(mean, mean, stdDev)) * chartH * 0.9;

  const curvePath = useMemo(() => {
    if (points.length === 0) return '';
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${scaleX(p.x).toFixed(1)},${scaleY(p.y).toFixed(1)}`)
      .join('');
  }, [points]);

  const shadedPath = useMemo(() => {
    if (shadeLeft === undefined && shadeRight === undefined) return null;

    const left = shadeLeft ?? xMin;
    const right = shadeRight ?? xMax;
    const shadePoints = points.filter(p => p.x >= left && p.x <= right);

    if (shadePoints.length === 0) return null;

    return (
      `M${scaleX(left).toFixed(1)},${scaleY(0).toFixed(1)}` +
      shadePoints.map((p) => `L${scaleX(p.x).toFixed(1)},${scaleY(p.y).toFixed(1)}`).join('') +
      `L${scaleX(right).toFixed(1)},${scaleY(0).toFixed(1)}Z`
    );
  }, [points, shadeLeft, shadeRight, xMin, xMax]);

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
      >
        <title id={titleId}>{ariaLabel ?? 'Kurva distribusi normal'}</title>
        <desc id={descId}>
          Kurva normal dengan mean {mean} dan standar deviasi {stdDev}. {shadeLeft !== undefined || shadeRight !== undefined ? 'Area probabilitas tertentu sedang diarsir.' : 'Tidak ada area probabilitas yang diarsir.'}
        </desc>
        {/* Grid lines */}
        {[-3, -2, -1, 0, 1, 2, 3].map((sigma) => {
          const x = scaleX(mean + sigma * stdDev);
          return (
            <g key={sigma}>
              <line
                x1={x} y1={padding.top}
                x2={x} y2={height - padding.bottom}
                stroke={CHART_COLORS.grid}
                strokeWidth={1}
                strokeDasharray={sigma === 0 ? 'none' : '4,4'}
              />
              {showLabels && (
                <text
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  fill="rgb(156, 163, 175)"
                  fontSize="12"
                >
                  {sigma === 0 ? `μ=${mean}` : `μ${sigma >= 0 ? '+' : ''}${sigma}σ`}
                </text>
              )}
            </g>
          );
        })}

        {/* Y-axis label */}
        {showLabels && (
          <text
            x={padding.left - 5}
            y={padding.top + 8}
            textAnchor="end"
            fill="rgb(156, 163, 175)"
            fontSize="11"
          >
            f(x)
          </text>
        )}

        {/* Shaded area */}
        {shadedPath && (
          <motion.path
            d={shadedPath}
            fill={shadeColor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Shade boundary lines */}
        {shadeLeft !== undefined && (
          <line
            x1={scaleX(shadeLeft)} y1={scaleY(0)}
            x2={scaleX(shadeLeft)} y2={height - padding.bottom}
            stroke={CHART_COLORS.shadeStroke}
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />
        )}
        {shadeRight !== undefined && (
          <line
            x1={scaleX(shadeRight)} y1={scaleY(0)}
            x2={scaleX(shadeRight)} y2={height - padding.bottom}
            stroke={CHART_COLORS.shadeStroke}
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />
        )}

        {/* The bell curve */}
        <motion.path
          d={curvePath}
          fill="none"
          stroke={CHART_COLORS.curve}
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Annotations (e.g., Z-score markers) */}
        {annotations.map((ann, i) => {
          const ax = scaleX(ann.x);
          return (
            <g key={i}>
              <circle cx={ax} cy={scaleY(normalPDFGeneral(ann.x, mean, stdDev))} r={4} fill={ann.color || CHART_COLORS.accent} />
              <line
                x1={ax} y1={scaleY(normalPDFGeneral(ann.x, mean, stdDev)) + 6}
                x2={ax} y2={scaleY(normalPDFGeneral(ann.x, mean, stdDev)) + 18}
                stroke={ann.color || CHART_COLORS.accent}
                strokeWidth={1.5}
              />
              <text
                x={ax}
                y={scaleY(normalPDFGeneral(ann.x, mean, stdDev)) + 32}
                textAnchor="middle"
                fill={ann.color || CHART_COLORS.accent}
                fontSize="13"
                fontWeight="600"
              >
                {ann.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
