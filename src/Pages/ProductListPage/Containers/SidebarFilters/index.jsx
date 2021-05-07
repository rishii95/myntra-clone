import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';

import FilterGroup from '../../Components/FilterGroup';

import styles from './SidebarFilters.module.scss';

export default function SidebarFilters({
  filterData,
}) {
  const getFilters = () => _map(filterData, (item, index) => (
    <FilterGroup key={index} title={item.type} filterValues={item.filterValues} />
  ));

  return (
    <div className={styles.sidebarFilter}>{getFilters()}</div>
  );
}

SidebarFilters.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    filterValues: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};
