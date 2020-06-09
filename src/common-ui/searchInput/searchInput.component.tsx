import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import style from './searchInput.module.scss';
import { Player, PlayersResponse, PlayerService } from '@services';
import debounce from 'lodash.debounce';
import { SearchResults } from '../searchResults/searchResults.component';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input } from '../input/input.component';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PlayerAction } from '@store';

interface SearchInputProps extends RouteComponentProps {
  className?: string;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ history, className }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>();

  useEffect(() => {
    setShowSearchResults(!!searchQuery || loading);
  }, [searchQuery, loading]);

  useEffect(() => {
    setErrorMessage(undefined);
    if (searchQuery) {
      setLoading(true);
      PlayerService.fetchPlayers({ search: searchQuery })
        .then((response: PlayersResponse) => {
          setSearchResults(response?.data || []);
        })
        .catch(e => {
          setErrorMessage(e?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const onSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleOnValueChange = debounce(onSearch, 350);

  const handleOnFocus = () => {
    setShowSearchResults(searchResults.length > 0);
  };

  const handleOnSelection = (player: Player) => {
    setShowSearchResults(false);
    dispatch(PlayerAction.setPlayer(player));
    history.push({ pathname: `/player/${player.id}/` });
  };

  return (
    <div className={className}>
      <Input
        placeholder='Search for a player'
        onValueChange={handleOnValueChange}
        onFocus={handleOnFocus}
        className={cx({ [style.inputWithSearchResults]: showSearchResults })}
        suffix={<AiOutlineSearch size='24px' />}
      />
      {showSearchResults && (
        <SearchResults
          searchResults={searchResults}
          loading={loading}
          errorMessage={errorMessage}
          onSelection={handleOnSelection}
        />
      )}
    </div>
  );
};

export const SearchInput = withRouter(SearchInputComponent);
