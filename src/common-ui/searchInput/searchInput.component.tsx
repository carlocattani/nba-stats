import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import style from './searchInput.module.scss';
import { Player, PlayersResponse, fetchPlayers } from '@services';
import debounce from 'lodash.debounce';
import { SearchResults } from '../searchResults/searchResults.component';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input } from '../input/input.component';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PlayerAction } from '@store';

interface SearchInputProps extends RouteComponentProps {}

const SearchInputComponent: React.FC<SearchInputProps> = ({ history }) => {
  const dispatch = useDispatch();

  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>();

  useEffect(() => {
    setShowSearchResults(!!searchQuery || loadingResults);
  }, [searchQuery, loadingResults]);

  useEffect(() => {
    if (searchQuery) {
      setLoadingResults(true);
      fetchPlayers({ search: searchQuery })
        .then((response: PlayersResponse) => {
          setSearchResults(response?.data || []);
        })
        .finally(() => {
          setLoadingResults(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const onSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleOnValueChange = debounce(onSearch, 300);

  const handleOnFocus = () => {
    setShowSearchResults(searchResults.length > 0);
  };

  const handleOnSelection = (player: Player) => {
    setShowSearchResults(false);
    dispatch(PlayerAction.setPlayer(player));
    history.push({ pathname: `/player/${player.id}/` });
  };

  return (
    <div>
      <Input
        placeholder='Search for a player'
        onValueChange={handleOnValueChange}
        onFocus={handleOnFocus}
        className={cx({ [style.inputWithSearchResults]: showSearchResults })}
        suffix={<AiOutlineSearch size='24px' />}
      />
      {showSearchResults && (
        <SearchResults
          searchQuery={searchQuery}
          searchResults={searchResults}
          loading={loadingResults}
          onSelection={handleOnSelection}
        />
      )}
    </div>
  );
};

export const SearchInput = withRouter(SearchInputComponent);
