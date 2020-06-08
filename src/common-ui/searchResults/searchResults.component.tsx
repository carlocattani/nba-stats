import React, { useMemo, ReactNode } from 'react';
import cx from 'classnames';
import style from './searchResults.module.scss';
import { Player, toPlayerName } from '@services';
import { useDispatch } from 'react-redux';
import { PlayerAction } from '@store';
import { Loading } from '../loading/loading.component';

interface SearchResultsProps {
  searchQuery: string;
  searchResults: Player[];
  loading: boolean;
  onSelection?: (playerId: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  searchResults = [],
  loading,
  onSelection
}) => {
  const dispatch = useDispatch();

  const handleOnClick = (player: Player) => {
    if (onSelection) {
      onSelection(player.id);
    }
    dispatch(PlayerAction.setPlayer(player));
  };

  const loadingRow: ReactNode = useMemo(
    () => (
      <div className={style.row}>
        <Loading />
      </div>
    ),
    []
  );

  const resultRows: ReactNode = useMemo(
    () =>
      searchResults?.length > 0 ? (
        searchResults.map((player: Player) => (
          <div
            className={cx(style.row, style.resultRow)}
            key={player.id}
            onClick={() => handleOnClick(player)}
          >
            <div className={style.playerName}>{toPlayerName(player)}</div>
            <div className={style.team}>{player.team?.full_name}</div>
          </div>
        ))
      ) : (
        <div className={style.row}>Nobody there</div>
      ),
    [searchResults]
  );

  if (!searchQuery) {
    return null;
  }

  return <div className={style.container}>{loading ? loadingRow : resultRows}</div>;
};
