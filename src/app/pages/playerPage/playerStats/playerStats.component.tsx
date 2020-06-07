import React, { useEffect, ReactNode } from 'react';
import style from './playerStats.module.scss';
import { seasonAveragesLabelMap } from '@services';
import { Loading } from '@common-ui';
import cx from 'classnames';
import { StatsSelector, SeasonAvgByYear, StatsAction } from '@store';
import { useSelector, useDispatch } from 'react-redux';

interface PlayerStatsProps {
  playerId: number;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ playerId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(StatsSelector.isLoading);
  const statsByYear: SeasonAvgByYear = useSelector(StatsSelector.getPlayerStats(playerId));

  useEffect(() => {
    if (playerId && !statsByYear) {
      dispatch(StatsAction.getSeasonAverages.request({ player_ids: [playerId] }));
    }
  }, [playerId]);

  const headerRow: ReactNode = (
    <div className={cx(style.row, style.headerRow)}>
      <div className={style.labelField}>Season</div>
      {Object.keys(statsByYear || {}).map(year => (
        <div key={year} className={style.valueField}>
          {year}
        </div>
      ))}
    </div>
  );

  const dataRows: ReactNode = (
    <>
      {Object.keys(statsByYear || {}).length > 0 ? (
        <>
          {headerRow}
          {Object.entries(seasonAveragesLabelMap).map(([statKey, label]) => (
            <div key={statKey} className={cx(style.row, style.dataRow)}>
              <div className={style.labelField}>
                <div className={style.label}>{label.code}</div>
                <div className={style.description}>{label.description}</div>
              </div>
              {Object.entries(statsByYear || {}).map(([year, avg]) => (
                <div key={year} className={style.valueField}>
                  {typeof avg[statKey] !== 'undefined' && (
                    <div className={style.value}>{avg[statKey]}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={style.row}>No data available for the current season</div>
      )}
    </>
  );

  return <div className={style.container}>{loading ? <Loading /> : dataRows}</div>;
};
