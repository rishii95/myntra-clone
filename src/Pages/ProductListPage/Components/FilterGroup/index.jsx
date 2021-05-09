import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getFilteredListData } from '../../../../Redux/Actions';

import Typography from '../../../../Common/Components/Typography';
import Checkbox from '../../../../Common/Components/Checkbox';

import variables from '../../../../Common/variables.module.scss';
import styles from './FilterGroup.module.scss';

const queryString = require('query-string');

const getKey = (title) => {
  switch (title) {
    case 'Department':
      return 'dept';
    case 'Color':
      return 'color';
    case 'Price':
      return 'price';
    default:
      return '';
  }
};
export default function FilterGroup({
  title, filterValues,
}) {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const dispatch = useDispatch();

  const getFilterValues = () => _map(filterValues, (item) => (
    <>
      <Checkbox
        onChange={() => {
          const qString = `${getKey(title)}=${item.name}&filterId=${item.id}`;
          history.push(`/products?${qString}`);
          dispatch(getFilteredListData(qString));
        }}
        key={item.id}
        checked={_get(params, 'filterId', null) === _get(item, 'id', null)}
      >
        {item.name}
      </Checkbox>
    </>
  ));
  return (
    <div className={styles.filterGroup}>
      <Typography type="subtitle" marginBottom={18} weight={variables.mediumFont}>{title}</Typography>
      <div className={styles.filters}>{getFilterValues()}</div>
    </div>
  );
}

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  filterValues: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
