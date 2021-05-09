/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Checkbox as CheckboxAntd } from 'antd';
import styles from './Checkbox.module.scss';

export default function Checkbox({ children, ...props }) {
  return (
    <CheckboxAntd className={styles.checkbox} {...props}>
      {children}
    </CheckboxAntd>
  );
}

Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
};
