import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _has from 'lodash/has';
// import _keys from 'lodash/keys';
import _size from 'lodash/size';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Loader from '../../Common/Components/Loader';
import Typography from '../../Common/Components/Typography';
import Sider from '../../Common/Components/Sider';
import ProductGrid from './Containers/ProductGrid';
import SidebarFilters from './Containers/SidebarFilters';

import { FILTERS, PAGE_SIZE, TOTAL_PAGES } from '../../Common/constants';
import {
  fetchProductListData, getStoredProductData, getSearchResults, fetchDataAndGetSearchResults,
  fetchDataAndFilterResults,
} from '../../Redux/Actions';

import styles from './ProductListPage.module.scss';
import Pagination from '../../Common/Components/Pagination';

const queryString = require('query-string');

const {
  Content,
} = Layout;

/* Product Listing page that contains the layout of sidebar
  filter and the product grid containing the products */

export default function ProductListPage() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => _get(state, 'productListReducer', {}));
  console.log(useSelector((state) => _get(state, 'productListReducer', [])));
  const location = useLocation();
  const params = queryString.parse(location.search, { arrayFormat: 'comma' });
  const searchQuery = _get(params, 'search', '');
  const filterIDs = _get(params, 'filterIDs', '');
  const [currentPage, setCurentPage] = useState(1);

  useEffect(() => {
    if (_isEmpty(params)) {
      dispatch(fetchProductListData(1));
    } else if (searchQuery) {
      dispatch(fetchDataAndGetSearchResults(1, params));
    } else {
      dispatch(fetchDataAndFilterResults(1, params));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      dispatch(getSearchResults(params));
      setCurentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!_isEmpty(filterIDs) && currentPage !== 1) {
      // dispatch(filterResults(params));
      setCurentPage(1);
    }
  }, [filterIDs]);

  /* Reference Data can be either data after search or the API fetched data on which pagination
     and filters will be then applied
  */
  const handlePagination = (page) => {
    setCurentPage(page);
    let referenceData = {};
    if (searchQuery) {
      referenceData = productListData.searchedData;
    } else if (filterIDs) {
      referenceData = productListData.filteredData;
    } else {
      referenceData = productListData.allData;
    }
    if (!_has(referenceData, page)) {
      dispatch(fetchProductListData(page));
    } else {
      dispatch(getStoredProductData(page, referenceData));
    }
  };
  const getTotalPages = () => {
    if (searchQuery) {
      return _size(_get(productListData, 'searchedData', {})) * PAGE_SIZE;
    } if (filterIDs) {
      return _size(_get(productListData, 'filteredData', {})) * PAGE_SIZE;
    }
    return TOTAL_PAGES;
  };
  return (
    <Content className={styles.contentWrapper}>
      <Layout className={styles.titleLayout}>
        <aside className={styles.titleSider}><Typography type="title">Filters</Typography></aside>
      </Layout>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <SidebarFilters filterData={FILTERS} />
        </Sider>
        <Content className={styles.content}>
          {_isEmpty(productListData.currentData) ? <Loader />
            : (
              <>
                <ProductGrid cardData={productListData.currentData} />
                <div className={styles.paginationWrapper}>
                  <Pagination
                    current={currentPage}
                    onChange={handlePagination}
                    total={getTotalPages()}
                  />
                </div>
              </>
            )}
        </Content>
      </Layout>
    </Content>
  );
}
