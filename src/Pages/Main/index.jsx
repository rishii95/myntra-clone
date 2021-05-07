import React from 'react';
import { Layout } from 'antd';
import ProductListPage from '../ProductListPage';
import Header from '../../Common/Components/Header';

import styles from './Main.module.scss';

export default function Main() {
  return (
    <Layout className={styles.layout}>
      <Header>
        <div className="logo" />
      </Header>
      <ProductListPage />
    </Layout>
  );
}
