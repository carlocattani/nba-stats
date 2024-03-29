import React, { ReactNode, useMemo } from 'react';
import style from './playerStats.module.scss';
import { StatsUtil, SeasonAverages } from '@services';
import { Loading } from '@common-ui';
import cx from 'classnames';
import { StatsSelector, SeasonAvgByYear } from '@store';
import { useSelector } from 'react-redux';

interface PlayerStatsProps {
  playerId: number;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ playerId }) => {
  const loading = useSelector(StatsSelector.isLoading);
  const statsByYear: SeasonAvgByYear = useSelector(StatsSelector.getPlayerStats(playerId));

  const statsByYearArray: [string, SeasonAverages][] = useMemo(
    () => Object.entries(statsByYear || {}),
    [statsByYear]
  );

  const headerRow: ReactNode = (
    <div className={cx(style.row, style.headerRow)}>
      <div className={style.labelField}>Season</div>
      {statsByYearArray.map(([year]) => (
        <div key={year} className={style.valueField}>
          {year}
        </div>
      ))}
    </div>
  );

  const dataRows: ReactNode = (
    <>
      {statsByYearArray.length > 0 && (
        <>
          {headerRow}
          {Object.entries(StatsUtil.seasonAveragesLabelMap).map(([statKey, label]) => (
            <div key={statKey} className={cx(style.row, style.dataRow)}>
              <div className={style.labelField}>
                <div className={style.label}>{label.code}</div>
                <div className={style.description}>{label.description}</div>
              </div>
              {statsByYearArray.map(([year, avg]) => (
                <div key={year} className={style.valueField}>
                  {typeof avg[statKey] !== 'undefined' && (
                    <div className={style.value}>{avg[statKey]}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );

  return <div>{loading ? <Loading /> : dataRows}</div>;
};
