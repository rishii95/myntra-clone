import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';
import _get from 'lodash/get';

import FilterGroup from '../../Components/FilterGroup';

import styles from './SidebarFilters.module.scss';

export default function SidebarFilters({
  filterData,
}) {
  const getFilters = () => _map(filterData, (item, index) => (
    <FilterGroup key={index} type={_get(item, 'type', '')} filterValues={_get(item, 'filterValues', [])} />
  ));

  return (
    <div className={styles.sidebarFilter}>{getFilters()}</div>
  );
}

SidebarFilters.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    filterValues: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,

    })),
  })).isRequired,
};
