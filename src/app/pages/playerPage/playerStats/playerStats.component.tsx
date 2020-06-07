import React, { useState, useEffect, ReactNode } from 'react';
import style from './playerStats.module.scss';
import {
  fetchSeasonAverages,
  SeasonAverages,
  seasonAveragesLabelMap,
  SeasonAveragesLabelMap
} from '@services';
import { mockSeasonAverages } from '@testing';
import { Loading } from '@common-ui';
import cx from 'classnames';

interface PlayerStatsProps {
  playerId: number;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ playerId }) => {
  const [loading, setLoading] = useState<boolean>();
  // an array of stats, containing season averages for different seasons
  const [stats, setStats] = useState<SeasonAverages[]>();
  const [labels, setLabels] = useState<SeasonAveragesLabelMap>();

  useEffect(() => {
    if (playerId) {
      setLoading(true);
      window.setTimeout(() => {
        setStats([mockSeasonAverages]);
        setLabels(seasonAveragesLabelMap);
        setLoading(false);
      }, 1000);
      /*
      fetchSeasonAverages({ player_ids: [playerId] }).then((response: SeasonAveragesResponse) => {
        setStats(response);
      });
      */
    }
  }, [playerId]);

  const headerRow: ReactNode = (
    <div className={cx(style.row, style.headerRow)}>
      <div className={style.labelField}>Season</div>
      {stats?.map(s => (
        <div key={s.season} className={style.valueField}>
          {s.season}
        </div>
      ))}
    </div>
  );

  const dataRows: ReactNode = (
    <>
      {stats?.length > 0 ? (
        <>
          {headerRow}
          {Object.entries(seasonAveragesLabelMap).map(([statKey, label]) => (
            <div key={statKey} className={cx(style.row, style.dataRow)}>
              <div className={style.labelField}>
                <div className={style.label}>{label.code}</div>
                <div className={style.description}>{label.description}</div>
              </div>
              {stats.map(s => (
                <div key={s.season} className={style.valueField}>
                  {typeof s[statKey] !== 'undefined' && (
                    <div className={style.value}>{s[statKey]}</div>
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
