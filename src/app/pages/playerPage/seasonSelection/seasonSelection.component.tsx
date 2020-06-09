import React, { useState, useCallback, useEffect } from 'react';
import { SeasonAvgByYear, StatsSelector, StatsAction } from '@store';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Error } from '@common-ui';
import { StatsUtil } from '@services';
import style from './seasonSelection.module.scss';

interface SeasonSelectionProps {
  playerId: number;
}

export const SeasonSelection: React.FC<SeasonSelectionProps> = ({ playerId }) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState<number>();
  const loading = useSelector(StatsSelector.isLoading);
  const errorMessage = useSelector(StatsSelector.getErrorMessage);
  const [noStatsMessage, setNoStatsMessage] = useState<string>();
  const statsByYear: SeasonAvgByYear = useSelector(StatsSelector.getPlayerStats(playerId));
  const [requestedSeason, setRequestedSeason] = useState<number>(StatsUtil.currentSeason);

  const hasStatsForTheYear = useCallback(year => statsByYear && statsByYear[year], [statsByYear]);

  useEffect(() => {
    if (playerId && !statsByYear) {
      loadSeason(StatsUtil.currentSeason);
    }
  }, [playerId]);

  useEffect(() => {
    if (loading === false) {
      if (!hasStatsForTheYear(requestedSeason)) {
        const season =
          requestedSeason === StatsUtil.currentSeason ? 'the current season' : requestedSeason;
        setNoStatsMessage(`No stats for ${season}, try another year`);
      } else {
        setNoStatsMessage(undefined);
      }
    } else {
      setNoStatsMessage(undefined);
    }
  }, [loading, requestedSeason, statsByYear]);

  const loadSeason = (season: number) => {
    setRequestedSeason(season);
    if (season && !hasStatsForTheYear(season)) {
      dispatch(StatsAction.getSeasonAverages.request({ player_ids: [playerId], season: season }));
    }
  };

  const loadAdditionalSeason = () => {
    loadSeason(year);
  };

  const handleOnChange = (value: string) => {
    setYear(StatsUtil.validateYear(value));
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
      <div className={style.message}>
        {errorMessage ? <Error message={errorMessage} /> : noStatsMessage}
      </div>
    </div>
  );
};
