import React from 'react';
import { Result, Empty } from 'antd';
import { PropTypes } from 'prop-types';
import styles from './Fallback.module.scss';
import Loader from '../Loader';
import { ERROR_STATES } from '../../constants';
import FallbackConstants from './Fallback.constants';

const getResult = (state, title, subtitle) => (
  <div className={styles.resultWrapper}>
    <Result
      status={state}
      title={title}
      subTitle={subtitle}
    />
  </div>
);
export default function Fallback({ state }) {
  const getState = () => {
    switch (state) {
      case ERROR_STATES.EMPTY:
        return <Empty />;
      case ERROR_STATES.LOADING:
        return <Loader />;
      case ERROR_STATES.NOT_FOUND:
        return getResult(state, FallbackConstants.NOT_FOUND_TITLE,
          FallbackConstants.NOT_FOUND_SUBTITLE);
      case ERROR_STATES.ERROR:
        return getResult(state, FallbackConstants.ERROR_TITLE,
          FallbackConstants.ERROR_SUBTITLE);
      default:
        return <Empty />;
    }
  };
  return <div className={styles.fallbackWrapper}>{getState()}</div>;
}

Fallback.propTypes = {
  state: PropTypes.oneOf(ERROR_STATES).isRequired,
};
