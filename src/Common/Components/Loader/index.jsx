import React from 'react';
import { Spin } from 'antd';

import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Spin size="large" />
    </div>
  );
}
