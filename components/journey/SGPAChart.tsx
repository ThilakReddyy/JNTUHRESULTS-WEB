interface SGPAChartProps {
  semesters: Array<{ semester: string; semesterSGPA: string; failed?: boolean }>;
}

const SGPAChart = ({ semesters }: SGPAChartProps) => {
  const valid = semesters.filter(
    (s) => s.semesterSGPA && parseFloat(s.semesterSGPA) > 0
  );
  if (valid.length < 2) return null;

  const sgpas = valid.map((s) => parseFloat(s.semesterSGPA));
  const rawMin = Math.min(...sgpas);
  const rawMax = Math.max(...sgpas);
  const minVal = Math.max(0, rawMin - 0.8);
  const maxVal = Math.min(10, rawMax + 0.5);

  const W = 600, H = 200;
  const padL = 42, padR = 24, padT = 28, padB = 42;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xOf = (i: number) =>
    padL + (valid.length === 1 ? plotW / 2 : (i / (valid.length - 1)) * plotW);
  const yOf = (v: number) =>
    padT + (1 - (v - minVal) / (maxVal - minVal)) * plotH;

  const pts = sgpas.map((v, i) => ({ x: xOf(i), y: yOf(v), v, sem: valid[i].semester }));

  let linePath = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cpx = ((p.x + c.x) / 2).toFixed(1);
    linePath += ` C ${cpx} ${p.y.toFixed(1)}, ${cpx} ${c.y.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }

  const bottom = (padT + plotH).toFixed(1);
  const fillPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${bottom} L ${pts[0].x.toFixed(1)} ${bottom} Z`;

  const yGridVals = [minVal, (minVal + maxVal) / 2, maxVal];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          SGPA Arc
        </h3>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ overflow: "visible" }}
        aria-label="SGPA journey chart"
      >
        <defs>
          <linearGradient id="sgpa-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yGridVals.map((v, i) => (
          <g key={i}>
            <line
              x1={padL} y1={yOf(v).toFixed(1)}
              x2={W - padR} y2={yOf(v).toFixed(1)}
              stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4"
            />
            <text
              x={padL - 6} y={(yOf(v) + 4).toFixed(1)}
              textAnchor="end" fontSize="9" fill="#9ca3af"
            >
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        <path d={fillPath} fill="url(#sgpa-fill)" />
        <path
          d={linePath} fill="none"
          stroke="#3b82f6" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        />

        {pts.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x.toFixed(1)} cy={p.y.toFixed(1)}
              r="5" fill="white" stroke="#3b82f6" strokeWidth="2.5"
            />
            <text
              x={p.x.toFixed(1)} y={(p.y - 11).toFixed(1)}
              textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6"
            >
              {p.v.toFixed(2)}
            </text>
            <text
              x={p.x.toFixed(1)} y={(H - padB + 16).toFixed(1)}
              textAnchor="middle" fontSize="9" fill="#9ca3af"
            >
              {p.sem}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SGPAChart;
