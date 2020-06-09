import React, { useMemo, ReactNode } from 'react';
import cx from 'classnames';
import style from './searchResults.module.scss';
import { Player, PlayerUtil } from '@services';
import { Loading } from '../loading/loading.component';
import { Error } from '../error/error.component';

interface SearchResultsProps {
  searchResults: Player[];
  loading: boolean;
  errorMessage: string;
  onSelection?: (player: Player) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults = [],
  loading,
  errorMessage,
  onSelection
}) => {
  const handleOnClick = (player: Player) => {
    if (onSelection) {
      onSelection(player);
    }
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
            <div className={style.playerName}>{PlayerUtil.getPlayerName(player)}</div>
            <div className={style.team}>{player.team?.full_name}</div>
          </div>
        ))
      ) : (
        <div className={style.row}>
          {errorMessage ? <Error message={errorMessage} /> : <>Nobody there</>}
        </div>
      ),
    [searchResults, errorMessage]
  );

  return <div className={style.container}>{loading ? loadingRow : resultRows}</div>;
};
