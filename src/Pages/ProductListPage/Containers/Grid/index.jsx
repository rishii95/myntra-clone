import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import _map from 'lodash/map';

import ProductCard from '../../Components/ProductCard';
import Typography from '../../../../Common/Components/Typography';

import variables from '../../../../Common/variables.module.scss';
import styles from './Grid.module.scss';

export default function Grid({
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
      keyValue={item.id}
      title={<Typography ellipsis type="title">{item.name}</Typography>}
      desc={<Typography ellipsis type="subtitle" color={variables.grey}>{item.desc}</Typography>}
      price={Number(item.price)}
      image={item.avatar}
      onImageLoad={onImageLoad}
      imageLoading={imageLoading}
    />
  ));
  return (
    <div className={styles.gridWrapper}>{getCards()}</div>
  );
}

Grid.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    avatar: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
