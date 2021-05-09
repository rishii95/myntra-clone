import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';
import _get from 'lodash/get';

import ProductCard from '../../Components/ProductCard';
import Typography from '../../../../Common/Components/Typography';

import variables from '../../../../Common/variables.module.scss';
import styles from './ProductGrid.module.scss';

export default function ProductGrid({
  cardData,
}) {
  const [imageLoading, setLoading] = useState(true);
  const counter = useRef(0);
  const onImageLoad = () => {
    counter.current += 1;
    if (counter.current >= cardData.length) {
      setLoading(false);
    }
  };

  const getCards = () => _map(cardData, (item) => (
    <ProductCard
      keyValue={_get(item, 'id', '')}
      title={<Typography ellipsis type="title">{_get(item, 'name', '')}</Typography>}
      desc={<Typography ellipsis type="subtitle" color={variables.grey}>{_get(item, 'desc', '')}</Typography>}
      price={Number(_get(item, 'price', null))}
      image={_get(item, 'avatar', '')}
      onImageLoad={onImageLoad}
      imageLoading={imageLoading}
    />
  ));
  return (
    <div className={styles.gridWrapper}>{getCards()}</div>
  );
}

ProductGrid.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    avatar: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
