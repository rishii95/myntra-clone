/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Skeleton } from 'antd';

import Price from '../../../../Common/Components/Price';

import styles from './ProductCard.module.scss';

const { Meta } = Card;

export default function ProductCard({
  title, desc, price, keyValue, image, onImageLoad, imageLoading,
}) {
  return (
    <Card
      hoverable
      className={styles.productCard}
      key={keyValue}
      cover={(
        <>
          <Skeleton loading={imageLoading} active size={210} />
          {/* <Skeleton active={imageLoading} size={210} /> */}
          <img
            alt="product"
            style={{ visibility: imageLoading ? 'hidden' : 'visible' }}
            src="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/3/16/66a74f48-2904-41d1-9832-f7f16da828921615899987024-1.jpg"
            onLoad={onImageLoad}
          />
          {/* <img
            alt="product"
            style={{ visibility: imageLoading ? 'hidden' : 'visible' }}
            onLoad={onImageLoad}
            src={image}
          /> */}
        </>
)}
    >
      <Meta title={title} description={desc} className={styles.cardMeta} />
      <Price className={styles.price}>{price}</Price>
    </Card>
  );
}
ProductCard.propTypes = {
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  keyValue: PropTypes.node,
  onImageLoad: PropTypes.func,
  imageLoading: PropTypes.bool,
};

ProductCard.defaultProps = {
  keyValue: null,
  onImageLoad: () => null,
  imageLoading: false,
};
