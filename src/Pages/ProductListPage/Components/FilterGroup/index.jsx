import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import _isArray from 'lodash/isArray';
import _remove from 'lodash/remove';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterResults } from '../../../../Redux/Actions';

import Typography from '../../../../Common/Components/Typography';
import Checkbox from '../../../../Common/Components/Checkbox';

import variables from '../../../../Common/variables.module.scss';
import styles from './FilterGroup.module.scss';

const queryString = require('query-string');

/* Mapping of filter name to be displayed with filter key name in the data
  from the API. Ideally this should have come from backend only.
*/
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
/* query-string package is used which returns string for single key
  and array for multiple so _isArray is used to handle all edge cases.
*/
const getValue = (keys, item) => {
  if (keys) {
    if (_isArray(keys)) {
      return [...keys, item.name];
    }
    return [keys, item.name];
  }
  return [item.name];
};

const getFilterValue = (type, item) => {
  if (type === 'Color') {
    return (
      <div className={styles.checboxValueWrapper}>
        {item.name}
        <span className={styles.colorIcon} style={{ backgroundColor: item.colorCode }} />
      </div>
    );
  }
  return item.name;
};
export default function FilterGroup({
  type, filterValues,
}) {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search, { arrayFormat: 'comma' });
  const searchQuery = params.search;
  const dispatch = useDispatch();
  const productListData = useSelector((state) => _get(state, 'productListReducer', {}));

  const getFilterValues = () => _map(filterValues, (item) => (
    <>
      <Checkbox
        onChange={(e) => {
          /* All the filter key names and their ids are appended into the url and
            the id is used to enable/disable the checkbox
          */
          let keys = _get(params, `${getKey(type)}`, '');
          let filterIDs = _get(params, 'filterIDs', []);
          filterIDs = _isArray(filterIDs) ? filterIDs : [filterIDs];

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
              filterIDs: [...filterIDs, item.id],
            };
          }

          const qString = queryString.stringify(updatedparams, { arrayFormat: 'comma' });
          history.push(`/products?${qString}`);
          if (searchQuery) {
            dispatch(filterResults(updatedparams, productListData.searchedData));
          } else {
            dispatch(filterResults(updatedparams, productListData.allData));
          }
        }}
        key={item.id}
        checked={_includes(_isArray(params.filterIDs)
          ? params.filterIDs : [params.filterIDs], _get(item, 'id', null))}
      >
        {getFilterValue(type, item)}
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
