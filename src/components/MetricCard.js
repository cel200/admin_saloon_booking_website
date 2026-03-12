export default function MetricCard({ title, value, change, icon: Icon, trend }) {
    const isPositive = trend === 'up';

    return (
        <div className="card metric-card">
            <div className="metric-header">
                <div className="icon-wrapper">
                    <Icon size={24} color={isPositive ? '#10b981' : '#f43f5e'} />
                </div>
                <span className={`trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
                    {isPositive ? '+' : ''}{change}%
                </span>
            </div>

            <div className="metric-content">
                <h3 className="metric-value">{value}</h3>
                <p className="metric-title">{title}</p>
            </div>

            <style jsx>{`
        .metric-card {
          position: relative;
          overflow: hidden;
        }

        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.03), transparent 70%);
          pointer-events: none;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trend {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .trend-up {
          color: #34d399; /* Emerald 400 */
          background: rgba(16, 185, 129, 0.1);
        }

        .trend-down {
          color: #fb7185; /* Rose 400 */
          background: rgba(244, 63, 94, 0.1);
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0.25rem;
          background: linear-gradient(to right, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .metric-title {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .icon-wrapper {
            width: 42px;
            height: 42px;
          }

          .metric-value {
            font-size: 1.6rem;
          }

          .metric-title {
            font-size: 0.88rem;
          }
        }
      `}</style>
        </div>
    );
}
