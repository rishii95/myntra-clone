import React, { useEffect } from 'react';
import { Layout } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Loader from '../../Common/Components/Loader';
import Typography from '../../Common/Components/Typography';
import Sider from '../../Common/Components/Sider';
import Grid from './Containers/Grid';
import SidebarFilters from './Containers/SidebarFilters';

import { fetchProductListData, getFilteredListData } from '../../Redux/Actions';

import styles from './ProductListPage.module.scss';

const queryString = require('query-string');

const {
  Content,
} = Layout;

/* Product Listing page that contains the layout of sidebar
  filter and the product grid containing the products */

export default function ProductListPage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer);
  const location = useLocation();
  const params = queryString.parse(location.search);

  useEffect(() => {
    if (_isEmpty(params)) {
      dispatch(fetchProductListData(1));
    } else {
      dispatch(getFilteredListData(queryString.stringify(params)));
    }
  }, []);

  return (
    <Content className={styles.contentWrapper}>
      <Layout className={styles.titleLayout}>
        <aside className={styles.titleSider}><Typography type="title">Filters</Typography></aside>
      </Layout>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <SidebarFilters filterData={[
            {
              type: 'Department',
              filterValues: [
                { name: 'Books', id: '1' }, { name: 'Games', id: '2' },
                { name: 'Electronics', id: '3' }, { name: 'Computers', id: '4' },
                { name: 'Movies', id: '5' },
              ],
            },
            {
              type: 'Color',
              filterValues: [
                { name: 'black', id: '6' }, { name: 'purple', id: '7' }, { name: 'white', id: '8' },
              ],
            },
          ]}
          />
        </Sider>
        <Content className={styles.content}>
          {_isEmpty(productList) ? <Loader /> : <Grid cardData={productList} />}
        </Content>
      </Layout>
    </Content>
  );
}
