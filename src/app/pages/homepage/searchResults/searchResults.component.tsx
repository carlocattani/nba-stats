import React, { useMemo, ReactNode } from 'react';
import cx from 'classnames';
import style from './searchResults.module.scss';
import { Loading } from '@common-ui';
import { Player } from '@services';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SearchResultsProps extends RouteComponentProps {
  searchQuery: string;
  searchResults: Player[];
  loading: boolean;
}

const loadingRow: ReactNode = (
  <div className={style.row}>
    <Loading />
  </div>
);

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  searchResults = [],
  loading,
  history
}) => {
  const handleOnClick = (playerId: number) => {
    history.push({ pathname: `/player/${playerId}/` });
  };

  const resultRows: ReactNode = useMemo(
    () =>
      searchResults?.length > 0 ? (
        searchResults.map((player: Player) => (
          <div
            className={cx(style.row, style.resultRow)}
            key={player.id}
            onClick={() => handleOnClick(player.id)}
          >
            <div className={style.playerName}>{`${player.first_name} ${player.last_name}`}</div>
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

export default withRouter(SearchResults);
