/* eslint-disable max-len */
import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';

import Typography from '../../../../Common/Components/Typography';
import Checkbox from '../../../../Common/Components/Checkbox';

import variables from '../../../../Common/variables.module.scss';
import styles from './FilterGroup.module.scss';

export default function FilterGroup({ title, filterValues }) {
  const getFilterValues = () => _map(filterValues, (item, index) => <Checkbox key={index}>{item}</Checkbox>);
  return (
    <div className={styles.filterGroup}>
      <Typography type="subtitle" marginBottom={18} weight={variables.mediumFont}>{title}</Typography>
      <div className={styles.filters}>{getFilterValues()}</div>
    </div>
  );
}

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};
