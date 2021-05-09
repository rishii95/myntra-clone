import { SET_PRODUCT_LIST } from '../Types';
import { fetchProductList, getFilteredList } from '../../Pages/ProductListPage/Services';

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

export const getFilteredListData = (queryString) => async (dispatch) => {
  const data = await getFilteredList(queryString);
  dispatch(setProductListData(data));
};
