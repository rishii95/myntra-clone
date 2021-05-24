import * as ActionTypes from '../Types';
import fetchProductList from '../../Pages/ProductListPage/Services';

export const setProductListData = (data, page) => (dispatch) => (
  dispatch({
    type: ActionTypes.SET_PRODUCT_LIST,
    payload: {
      data,
      page,
    },
  })
);

export const getStoredProductData = (page, referenceData) => (dispatch) => (
  dispatch({
    type: ActionTypes.GET_STORED_PRODUCT_LIST,
    payload: {
      page,
      referenceData,
    },
  })
);

export const getSearchResults = (params) => (dispatch) => (
  dispatch({
    type: ActionTypes.GET_SEARCH_RESULTS,
    payload: {
      params,
    },
  })
);

export const filterResults = (params, referenceData) => (dispatch) => (
  dispatch({
    type: ActionTypes.FILTER_RESULTS,
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
