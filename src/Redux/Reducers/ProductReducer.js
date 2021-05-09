import { SET_PRODUCT_LIST } from '../Types';

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return [
        ...action.payload.data,
      ];
    default: return state;
  }
};

export default productListReducer;
