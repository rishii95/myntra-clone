import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Sider.module.scss';

export default function Sider({ children, className }) {
  return (
    <aside className={`${styles.siderStyles} ${className}`}>{children}</aside>
  );
}

Sider.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Sider.defaultProps = {
  className: '',
};
