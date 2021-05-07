import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'antd';

import Price from '../../../../Common/Components/Price';

import styles from './ProductCard.module.scss';

const { Meta } = Card;

export default function ProductCard({
  title, desc, price, key,
}) {
  return (
    <Card
      hoverable
      className={styles.productCard}
      key={key}
      cover={<img alt="example" src="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/3/16/66a74f48-2904-41d1-9832-f7f16da828921615899987024-1.jpg" />}
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
  key: PropTypes.node,
};

ProductCard.defaultProps = {
  key: null,
};
