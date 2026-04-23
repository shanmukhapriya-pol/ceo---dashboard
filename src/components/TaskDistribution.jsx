import PropTypes from 'prop-types';
import MoreMenu from './MoreMenu.jsx';

const DATA = [
  { label: 'Design',      assigned: 45, completed: 30 },
  { label: 'Development', assigned: 62, completed: 45 },
  { label: 'Marketing',   assigned: 38, completed: 20 },
  { label: 'Sales',       assigned: 25, completed: 15 },
  { label: 'HR',          assigned: 18, completed: 10 },
];

const Y_TICKS = [0, 10, 20, 30, 40, 50, 60];
const MAX_VAL = 70;

// Smooth curve through points using cubic bezier
function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 2;
    const cp1y = points[i].y;
    const cp2x = points[i].x + (points[i + 1].x - points[i].x) / 2;
    const cp2y = points[i + 1].y;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
  }
  return d;
}

function TaskDistribution({ onAddTask }) {
  const svgW = 480;
  const svgH = 260;
  const padL = 36;
  const padR = 16;
  const padT = 10;
  const padB = 28;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const barW = 36;
  const step = chartW / DATA.length;

  const barX = (i) => padL + i * step + (step - barW) / 2;
  const barY = (val) => padT + chartH - (val / MAX_VAL) * chartH;
  const barH = (val) => (val / MAX_VAL) * chartH;

  const linePoints = DATA.map((d, i) => ({
    x: padL + i * step + step / 2,
    y: padT + chartH - (d.completed / MAX_VAL) * chartH,
  }));

  return (
    <section className="task-distribution">
      <div className="task-distribution__header">
        <div>
          <h2>Task Distribution &amp; Progress</h2>
          <p className="task-distribution__subtitle">Hierarchical view: Management &gt; Tasks</p>
        </div>
        <button className="bm-btn-outline">📤 Export</button>
      </div>

      {/* Legend */}
      <div className="task-distribution__legend">
        <span className="td-legend-item">
          <span className="td-legend-box" />
          Assigned Tasks
        </span>
        <span className="td-legend-item">
          <span className="td-legend-line" />
          Completed
        </span>
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Y-axis grid lines + labels */}
        {Y_TICKS.map((tick) => {
          const y = padT + chartH - (tick / MAX_VAL) * chartH;
          return (
            <g key={tick}>
              <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={padL - 6} y={y + 4} fontSize="9" fill="#94a3b8" textAnchor="end">{tick}</text>
            </g>
          );
        })}

        {/* Bars */}
        {DATA.map((d, i) => (
          <rect
            key={d.label}
            x={barX(i)}
            y={barY(d.assigned)}
            width={barW}
            height={barH(d.assigned)}
            fill="#1a3a8f"
            rx="4"
          />
        ))}

        {/* Smooth line */}
        <path d={smoothPath(linePoints)} fill="none" stroke="#22c55e" strokeWidth="2.5" />

        {/* Dots on line */}
        {linePoints.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#22c55e" strokeWidth="2.5" />
        ))}

        {/* X-axis labels */}
        {DATA.map((d, i) => (
          <text
            key={d.label}
            x={padL + i * step + step / 2}
            y={svgH - 6}
            fontSize="10"
            fill="#64748b"
            textAnchor="middle"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </section>
  );
}

TaskDistribution.propTypes = {
  tasks: PropTypes.array,
  onAddTask: PropTypes.func,
};

export default TaskDistribution;
