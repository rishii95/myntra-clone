import React from 'react';
import { PropTypes } from 'prop-types';
import { Layout } from 'antd';
import styles from './Header.module.scss';

const {
  Header: HeaderAntd,
} = Layout;

export default function Header({ children }) {
  return (
    <HeaderAntd className={styles.header}>
      {children}
    </HeaderAntd>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
