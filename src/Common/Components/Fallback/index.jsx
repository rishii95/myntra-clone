import React from 'react';
import { Result, Empty } from 'antd';
import { PropTypes } from 'prop-types';
import styles from './Fallback.module.scss';
import Loader from '../Loader';

export default function Fallback({ state }) {
  const getState = () => {
    switch (state) {
      case 'Empty':
        return <Empty />;
      case 'Loading':
        return <Loader />;
      case '404':
        return (
          <div className={styles.resultWrapper}>
            <Result
              status={state}
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          </div>
        );
      case '500':
        return (
          <div className={styles.resultWrapper}>
            <Result
              status={state}
              title="Oops"
              subTitle="Sorry, something went wrong. Please try again."
            />
          </div>
        );
      default:
        return <Empty />;
    }
  };
  return <div className={styles.fallbackWrapper}>{getState()}</div>;
}

Fallback.propTypes = {
  state: PropTypes.oneOf(['Empty', '404', 'Loading', '500']).isRequired,
};
