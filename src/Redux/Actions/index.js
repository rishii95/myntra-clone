import {
  SET_PRODUCT_LIST, GET_STORED_PRODUCT_LIST, GET_SEARCH_RESULTS, FILTER_RESULTS,
} from '../Types';
import fetchProductList from '../../Pages/ProductListPage/Services';

export const setProductListData = (data, page) => (dispatch) => (
  dispatch({
    type: SET_PRODUCT_LIST,
    payload: {
      data,
      page,
    },
  })
);

export const getStoredProductData = (page, referenceData) => (dispatch) => (
  dispatch({
    type: GET_STORED_PRODUCT_LIST,
    payload: {
      page,
      referenceData,
    },
  })
);

export const getSearchResults = (params) => (dispatch) => (
  dispatch({
    type: GET_SEARCH_RESULTS,
    payload: {
      params,
    },
  })
);

export const filterResults = (params, referenceData) => (dispatch) => (
  dispatch({
    type: FILTER_RESULTS,
    payload: {
      params,
      referenceData,
    },
  })
);

export const fetchProductListData = (page) => async (dispatch) => {
  const data = await fetchProductList(page);
  await dispatch(setProductListData(data, page));
};

export const fetchDataAndGetSearchResults = (page, params) => async (dispatch) => {
  await dispatch(fetchProductListData(page));
  await dispatch(getSearchResults(params));
};

export const fetchDataAndFilterResults = (page, params, referenceData) => async (dispatch) => {
  await dispatch(fetchProductListData(page));
  await dispatch(filterResults(params, referenceData));
};

// eslint-disable-next-line max-len
export const fetchDataAndSearchAndFilterResults = (page, params, referenceData) => async (dispatch) => {
  await dispatch(fetchDataAndGetSearchResults(page, params));
  await dispatch(filterResults(params, referenceData));
};
