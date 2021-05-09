import React, { useEffect } from 'react';
import { Layout } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../Common/Components/Loader';
import Typography from '../../Common/Components/Typography';
import Sider from '../../Common/Components/Sider';
import Grid from './Containers/Grid';
import SidebarFilters from './Containers/SidebarFilters';

import { fetchProductListData } from '../../Redux/Actions';

import styles from './ProductListPage.module.scss';

const {
  Content,
} = Layout;

/* Product Listing page that contains the layout of sidebar
  filter and the product grid containing the products */

export default function ProductListPage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer);

  useEffect(() => {
    dispatch(fetchProductListData(1));
  }, []);

  return (
    <Content className={styles.contentWrapper}>
      <Layout className={styles.titleLayout}>
        <aside className={styles.titleSider}><Typography type="title">Filters</Typography></aside>
      </Layout>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <SidebarFilters filterData={[
            { type: 'Department', filterValues: ['Books', 'Games', 'Electronics', 'Computers', 'Movies'] },
            { type: 'Color', filterValues: ['black', 'purple', 'white'] },
            { type: 'Price', filterValues: ['Rs 1000 to Rs 2000', 'Rs 2001 to Rs 3000', 'Rs 3001 to Rs 4000'] }]}
            // { type: 'Price', filterValues: [{ min: 1000, max: 2000 },
            //  { min: 2001, max: 3000 }, { min: 3001, max: 4000 }] }]}
          />
        </Sider>
        <Content className={styles.content}>
          {_isEmpty(productList) ? <Loader /> : <Grid cardData={productList} />}
        </Content>
      </Layout>
    </Content>
  );
}
