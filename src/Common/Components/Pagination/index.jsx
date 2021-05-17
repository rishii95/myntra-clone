/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Pagination as PaginationAntd } from 'antd';
import './Pagination.scss';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants';

export default function Pagination({ total, onChange, ...rest }) {
  return (
    <div className="pagination-wrapper">
      <PaginationAntd
        className="pagination"
        onChange={onChange}
        defaultCurrent={1}
        total={total || TOTAL_PAGES}
        showSizeChanger={false}
        pageSize={PAGE_SIZE}
        {...rest}
      />
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
