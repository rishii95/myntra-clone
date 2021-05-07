import React from 'react';
import { Layout } from 'antd';

import Typography from '../../Common/Components/Typography';
import Sider from '../../Common/Components/Sider';
import Grid from './Containers/Grid';
import SidebarFilters from './Containers/SidebarFilters';

import styles from './ProductListPage.module.scss';

const {
  Content,
} = Layout;

/* Product Listing page that contains the layout of sidebar
  filter and the product grid containing the products */

export default function ProductListPage() {
  return (
    <Content className={styles.contentWrapper}>
      <Layout className={styles.titleLayout}>
        <aside className={styles.titleSider}><Typography type="title">Filters</Typography></aside>
      </Layout>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <SidebarFilters filterData={[{ type: 'Brand', filterValues: ['Roadster', 'Puma'] },
            { type: 'Color', filterValues: ['Black', 'Navy Blue'] }]}
          />
        </Sider>
        <Content className={styles.content}>
          <Grid cardData={[{ title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 },
            { title: 'Title', subtitle: 'Subtitle', price: 20 }, { title: 'Title', subtitle: 'Subtitle', price: 20 }]}
          />
        </Content>
      </Layout>
    </Content>
  );
}
