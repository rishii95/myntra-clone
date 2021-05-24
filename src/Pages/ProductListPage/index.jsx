import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _size from 'lodash/size';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Typography from '../../Common/Components/Typography';
import Sider from '../../Common/Components/Sider';
import Fallback from '../../Common/Components/Fallback';
import ProductGrid from './Containers/ProductGrid';
import SidebarFilters from './Containers/SidebarFilters';

import {
  ERROR_STATES, FILTERS, PAGE_SIZE, TOTAL_PAGES, TYPOGRAPHY_TYPES,
} from '../../Common/constants';
import {
  fetchProductListData, getStoredProductData, getSearchResults, fetchDataAndGetSearchResults,
  fetchDataAndFilterResults, fetchDataAndSearchAndFilterResults,
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

  /* This is when the page is refreshed or loaded for the first time with either nothing or
    search/filter query params attached to url
  */
  useEffect(() => {
    if (_isEmpty(params)) {
      dispatch(fetchProductListData(1));
    } else if (searchQuery && filterIDs) {
      dispatch(fetchDataAndSearchAndFilterResults(1, params, productListData.searchedData));
    } else if (searchQuery) {
      dispatch(fetchDataAndGetSearchResults(1, params));
    } else {
      dispatch(fetchDataAndFilterResults(1, params, productListData.allData));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      dispatch(getSearchResults(params));
      setCurentPage(1);
    }
  }, [searchQuery]);

  /* Change page number back to 1 once filtered data is created */
  useEffect(() => {
    setCurentPage(1);
  }, [productListData.filteredData]);

  /* Reference Data can be either data after search or the API fetched data on which pagination
     and filters will be then applied
  */
  const handlePagination = (page) => {
    setCurentPage(page);
    let referenceData = {};
    // This condition with filterIDs works for both - only filter or filter + search combined
    if (filterIDs) {
      referenceData = productListData.filteredData;
    } else if (searchQuery) {
      referenceData = productListData.searchedData;
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
    // This condition with filterIDs works for both - only filter or filter + search combined
    if (filterIDs) {
      return _size(_get(productListData, 'filteredData', {})) * PAGE_SIZE;
    }
    if (searchQuery) {
      return _size(_get(productListData, 'searchedData', {})) * PAGE_SIZE;
    }
    return TOTAL_PAGES;
  };

  const getData = () => {
    if (!productListData.currentData) {
      return <Fallback state={ERROR_STATES.LOADING} />;
    }
    if (_isEmpty(productListData.currentData)) {
      return <Fallback state={ERROR_STATES.EMPTY} />;
    }
    return (
      <>
        <ProductGrid cardData={productListData.currentData} />
        <div className={styles.paginationWrapper} data-testid="pagination">
          <Pagination
            current={currentPage}
            onChange={handlePagination}
            total={getTotalPages()}
          />
        </div>
      </>
    );
  };

  return (
    <Content className={styles.contentWrapper}>
      <Layout className={styles.titleLayout}>
        <aside className={styles.titleSider}>
          <Typography
            type={TYPOGRAPHY_TYPES.TITLE}
          >
            Filters
          </Typography>

        </aside>
      </Layout>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <SidebarFilters filterData={FILTERS} />
        </Sider>
        <Content className={styles.content}>
          {getData()}
        </Content>
      </Layout>
    </Content>
  );
}
