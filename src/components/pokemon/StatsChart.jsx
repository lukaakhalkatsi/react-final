import { getStatPercentage, capitalize } from '../../utils/helpers';
import '../../styles/components/StatsChart.scss';

const StatsChart = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="stats-chart">
      <h3 className="stats-chart__title">Base Stats</h3>
      <div className="stats-chart__list">
        {stats.map((stat) => {
          const percentage = getStatPercentage(stat.base_stat);
          return (
            <div key={stat.stat.name} className="stats-chart__item">
              <div className="stats-chart__header">
                <span className="stats-chart__name">
                  {capitalize(stat.stat.name.replace(/-/g, ' '))}
                </span>
                <span className="stats-chart__value">{stat.base_stat}</span>
              </div>
              <div className="stats-chart__bar">
                <div
                  className="stats-chart__bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsChart;

