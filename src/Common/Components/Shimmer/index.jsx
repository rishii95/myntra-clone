/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Skeleton } from 'antd';

export default function Shimmer(props) {
  return (
    <Skeleton active shape="square" {...props} />
  );
}
