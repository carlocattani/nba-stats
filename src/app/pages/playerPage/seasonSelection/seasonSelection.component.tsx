import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { SeasonAvgByYear, StatsSelector, StatsAction } from '@store';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@common-ui';
import { validateYear } from '@services';
import style from './seasonSelection.module.scss';

interface SeasonSelectionProps {
  playerId: number;
}

export const SeasonSelection: React.FC<SeasonSelectionProps> = ({ playerId }) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState<number>();
  const loading = useSelector(StatsSelector.isLoading);
  const statsByYear: SeasonAvgByYear = useSelector(StatsSelector.getPlayerStats(playerId));
  const [requestedYear, setRequestedYear] = useState<number>();
  const [message, setMessage] = useState<string>();

  const hasStatsForTheYear = useCallback(year => statsByYear && statsByYear[year], [statsByYear]);

  useEffect(() => {
    if (playerId) {
      setRequestedYear(undefined);
    }
  }, [playerId]);

  useEffect(() => {
    if (loading === false) {
      if (requestedYear && !hasStatsForTheYear(requestedYear)) {
        setMessage(`Season averages not available for ${requestedYear}`);
      } else if (!requestedYear && !statsByYear) {
        setMessage('No data for the current season, try another year');
      } else {
        setMessage(undefined);
      }
    } else {
      setMessage(undefined);
    }
  }, [loading, requestedYear, statsByYear]);

  const handleOnChange = (value: string) => {
    setYear(validateYear(value));
  };

  const loadAdditionalSeason = () => {
    if (year && !hasStatsForTheYear(year)) {
      setRequestedYear(year);
      setMessage(undefined);
      dispatch(StatsAction.getSeasonAverages.request({ player_ids: [playerId], season: year }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <Input
          type='number'
          onValueChange={handleOnChange}
          placeholder='Year'
          className={style.input}
        />
        <Button onClick={loadAdditionalSeason} disabled={!year} className={style.button}>
          Load stats
        </Button>
      </div>
      <div className={style.message}>{message}</div>
    </div>
  );
};
