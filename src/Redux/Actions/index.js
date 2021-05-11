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
export const fetchProductListData = (page) => async (dispatch) => {
  const data = await fetchProductList(page);
  await dispatch(setProductListData(data, page));
};

export const getSearchResults = (params) => (dispatch) => (
  dispatch({
    type: GET_SEARCH_RESULTS,
    payload: {
      params,
    },
  })
);

export const filterResults = (params) => (dispatch) => (
  dispatch({
    type: FILTER_RESULTS,
    payload: {
      params,
    },
  })
);

export const fetchDataAndGetSearchResults = (page, params) => async (dispatch) => {
  await dispatch(fetchProductListData(page));
  dispatch(getSearchResults(params));
};

export const fetchDataAndFilterResults = (page, params) => async (dispatch) => {
  await dispatch(fetchProductListData(page));
  dispatch(filterResults(params));
};
