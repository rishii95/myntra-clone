import React from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';

import ProductCard from '../../Components/ProductCard';
import Typography from '../../../../Common/Components/Typography';

import variables from '../../../../Common/variables.module.scss';
import styles from './Grid.module.scss';

export default function Grid({
  cardData,
}) {
  const getCards = () => _map(cardData, (item, index) => (
    <ProductCard
      key={index}
      title={<Typography type="title">{item.title}</Typography>}
      desc={<Typography type="subtitle" color={variables.grey}>{item.subtitle}</Typography>}
      price={20}
    />
  ));
  return (
    <div className={styles.gridWrapper}>{getCards()}</div>
  );
}

Grid.propTypes = {
  cardData: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,
};
