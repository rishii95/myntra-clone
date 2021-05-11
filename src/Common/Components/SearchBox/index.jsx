/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import _get from 'lodash/get';
import {
  SearchOutlined,
} from '@ant-design/icons';
import styles from './SearchBox.module.scss';
import variables from '../../variables.module.scss';

function SearchBox() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const aEl = useRef(null);

  return (
    <div className={styles.searchBoxWrapper}>
      <a
        ref={aEl}
        className={styles.searchBtn}
        {...(query && { href: `products?search=${query}` })}
        aria-label="Search"
      >
        <SearchOutlined
          className={styles.searchIcon}
          style={{ color: variables.grey }}
        />
      </a>
      <input
        placeholder="Search for all products"
        type="search"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // aEl.current.click();
            history.push(`products?search=${query}`);
          }
        }}
        onChange={(e) => setQuery(_get(e, 'target.value', ''))}
        className={styles.searchInput}
        aria-label="Search for products"

      />
    </div>
  );
}
export default withRouter(SearchBox);
