/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import _get from 'lodash/get';
import _has from 'lodash/has';
import _reduce from 'lodash/reduce';
import _includes from 'lodash/includes';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import _values from 'lodash/values';
import _keys from 'lodash/keys';
import _flatten from 'lodash/flatten';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';

import {
  SET_PRODUCT_LIST, GET_STORED_PRODUCT_LIST, GET_SEARCH_RESULTS, FILTER_RESULTS,
} from '../Types';
import { PAGE_SIZE } from '../../Common/constants';

const initialState = {
  allData: {},
  currentData: [],
  searchedData: {},
  filteredData: {},
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST: {
      const currentData = _get(action, 'payload.data', []);
      const allData = _get(state, 'allData', {});
      const page = _get(action, 'payload.page', -1);

      if (!_has(allData, page)) {
        allData[page] = currentData;
      }
      return { allData, currentData };
    }

    case GET_STORED_PRODUCT_LIST: {
      const page = _get(action, 'payload.page', -1);
      const referenceData = _get(action, 'payload.referenceData', {});
      return { ...state, currentData: referenceData[page] };
    }

    case GET_SEARCH_RESULTS: {
      const query = _get(action, 'payload.params.search', '');
      const allData = _get(state, 'allData', {});

      let page = 1;
      const searchedData = _reduce(_values(allData),
        (result, pageData) => {
          const filteredList = _filter(pageData, (item) => _includes(_toLower(_get(item, 'desc', '')), _toLower(query))
          || _includes(_toLower(_get(item, 'name', '')), _toLower(query)));
          if (_isEmpty(filteredList)) {
            return result;
          }
          const pageLength = _get(result, `[${page}].length`, 0);
          if (pageLength === PAGE_SIZE) {
            return { ...result, [++page]: filteredList };
          }
          if (pageLength + filteredList.length > PAGE_SIZE) {
            const spaceLeftInPage = PAGE_SIZE - pageLength;
            return {
              ...result,
              [page]: [...(result[page] || []), ...filteredList.slice(0, spaceLeftInPage)],
              [++page]: [...(result[page] || []), ...filteredList.slice(spaceLeftInPage)],
            };
          }
          return { ...result, [page]: [...(result[page] || []), ...filteredList] };
        }, {});
      return { ...state, searchedData, currentData: _values(searchedData)[0] || [] };
    }

    case FILTER_RESULTS: {
      const filters = _get(action, 'payload.params', {});
      const allData = _get(state, 'allData', {});
      const allDataValues = _flatten(_values(allData));
      delete filters.filterIDs;
      const filterKeys = _keys(filters);
      let page = 1;

      const filteredData = _reduce(allDataValues, (result, data, key) => {
        const updatedResult = { ...result };

        let flag = 0;
        const pageLength = _get(updatedResult, `[${page}].length`, 0);
        filterKeys.forEach((filterKey) => {
          if (_includes(_map(_isArray(filters[filterKey])
            ? filters[filterKey] : [filters[filterKey]], _toLower),
          _toLower(data[filterKey]))) {
            flag++;
          }
        });
        if (flag !== filterKeys.length) {
          return updatedResult;
        }
        if (pageLength === PAGE_SIZE) {
          updatedResult[++page] = [data];
        } else {
          if (_isEmpty(updatedResult)) {
            updatedResult[page] = [];
          }
          updatedResult[page].push(data);
        }
        return updatedResult;
      }, {});

      return { ...state, filteredData, currentData: _get(filteredData, '1', []) };
    }

    default: return state;
  }
};

export default productListReducer;
