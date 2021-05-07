import React from 'react';
import { PropTypes } from 'prop-types';
import { Checkbox as CheckboxAntd } from 'antd';
import styles from './Checkbox.module.scss';

export default function Checkbox({ children }) {
  return (
    <CheckboxAntd className={styles.checkbox}>
      {children}
    </CheckboxAntd>
  );
}

Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
};
