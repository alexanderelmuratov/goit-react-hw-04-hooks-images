import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdImageSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  StyledSearchbar,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.warn('Please fill in the search field!');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <StyledSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <MdImageSearch style={{ width: 30, height: 30 }} />
        </SearchButton>
        <SearchInput
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
