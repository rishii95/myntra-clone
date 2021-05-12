/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import _get from 'lodash/get';
import {
  SearchOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styles from './SearchBox.module.scss';
import variables from '../../variables.module.scss';

function SearchBox() {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    if (query) {
      history.push(`products?search=${query}`);
    }
  };
  const handleClear = () => {
    history.push('/');
    setQuery('');
  };
  return (
    <div className={styles.searchBoxWrapper}>
      <button
        type="button"
        className={styles.searchBtn}
        onClick={handleSearch}
      >
        <SearchOutlined
          className={styles.searchIcon}
          style={{ color: variables.grey }}
        />
      </button>
      <input
        placeholder="Search for all products"
        value={query}
        type="search"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        onChange={(e) => setQuery(_get(e, 'target.value', ''))}
        className={styles.searchInput}
        aria-label="Search for products"

      />
      {query && (
      <button
        type="button"
        className={styles.closeIcon}
        onClick={handleClear}
      >
        <CloseCircleOutlined style={{ color: variables.grey }} />
      </button>
      )}
    </div>
  );
}
export default withRouter(SearchBox);
