import React, { useEffect, useState, useMemo } from 'react';
import cx from 'classnames';
import style from './searchInput.module.scss';
import { Input } from '@common-ui';
import { Player, PlayersResponse, fetchPlayers } from '@services';
import debounce from 'lodash.debounce';
import SearchResults from '../searchResults/searchResults.component';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchInput: React.FC = () => {
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchResults, setSearchResults] = useState<Player[]>([]);

  const showSearchResults = useMemo(() => searchQuery || loadingResults, [
    searchQuery,
    loadingResults
  ]);

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

  return (
    <>
      <Input
        placeholder='Search for a player'
        onValueChange={handleOnValueChange}
        className={cx({ [style.inputWithSearchResults]: showSearchResults })}
        suffix={<AiOutlineSearch size='24px' />}
      />
      <SearchResults
        searchQuery={searchQuery}
        searchResults={searchResults}
        loading={loadingResults}
      />
    </>
  );
};
