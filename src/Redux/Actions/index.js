/* eslint-disable no-unused-vars */
import { FETCH_PRODUCT_LIST, SET_PRODUCT_LIST } from '../Types';
import { fetchProductList } from '../../Pages/ProductListPage/Services';

export const setProductListData = (data) => (dispatch) => (
  dispatch({
    type: SET_PRODUCT_LIST,
    payload: {
      data,
    },
  })
);

export const fetchProductListData = (page) => async (dispatch) => {
  const data = await fetchProductList(page);
  dispatch(setProductListData(data));
};
