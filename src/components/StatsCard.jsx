function StatsCard({ label, value, supplementary }) {
  return (
    <div className="stats-card">
      <div className="stats-label">{label}</div>
      <div className="stats-value">{value}</div>
      <div className="stats-supplementary">{supplementary}</div>
    </div>
  );
}

export default StatsCard;
