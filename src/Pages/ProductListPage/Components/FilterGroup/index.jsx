/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _remove from 'lodash/remove';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { filterResults } from '../../../../Redux/Actions';

import Typography from '../../../../Common/Components/Typography';
import Checkbox from '../../../../Common/Components/Checkbox';

import variables from '../../../../Common/variables.module.scss';
import styles from './FilterGroup.module.scss';

const queryString = require('query-string');

const getKey = (type) => {
  switch (type) {
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

const getValue = (keys, item) => {
  if (keys) {
    if (_isArray(keys)) {
      return [...keys, item.name];
    }
    return [keys, item.name];
  }
  return [item.name];
};
export default function FilterGroup({
  type, filterValues,
}) {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search, { arrayFormat: 'comma' });
  const dispatch = useDispatch();

  const getFilterValues = () => _map(filterValues, (item) => (
    <>
      <Checkbox
        onChange={(e) => {
          let keys = _get(params, `${getKey(type)}`, '');
          let filterIDs = _get(params, 'filterIDs', []);
          let updatedparams = { ...params };
          if (!e.target.checked) {
            if (!_isArray(keys)) {
              delete updatedparams[getKey(type)];
            } else {
              keys = _remove(keys, (keyVal) => keyVal !== item.name);
            }
            if (!_isArray(filterIDs)) {
              delete updatedparams.filterIDs;
            } else {
              filterIDs = _remove(filterIDs, (keyVal) => keyVal !== item.id);
            }
            updatedparams = {
              ...updatedparams,
              ...(updatedparams[getKey(type)] && { [getKey(type)]: keys }),
              ...(updatedparams.filterIDs && { filterIDs }),
            };
          } else {
            updatedparams = {
              ...updatedparams,
              [getKey(type)]: getValue(keys, item),
              filterIDs: [...filterIDs, ...item.id],
            };
          }

          const qString = queryString.stringify(updatedparams, { arrayFormat: 'comma' });
          // `${getKey(type)}=${item.name}&filterId=${item.id}`;
          history.push(`/products?${qString}`);
          dispatch(filterResults(updatedparams));
        }}
        key={item.id}
        checked={_includes(_get(params, 'filterIDs', []), _get(item, 'id', null))}
      >
        {item.name}
      </Checkbox>
    </>
  ));
  return (
    <div className={styles.filterGroup}>
      <Typography type="subtitle" marginBottom={18} weight={variables.mediumFont}>{type}</Typography>
      <div className={styles.filters}>{getFilterValues()}</div>
    </div>
  );
}

FilterGroup.propTypes = {
  type: PropTypes.string.isRequired,
  filterValues: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
