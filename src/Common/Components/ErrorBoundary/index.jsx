import React from 'react';
import { PropTypes } from 'prop-types';

import Fallback from '../Fallback';

import { ERROR_STATES } from '../../constants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Fallback state={ERROR_STATES.ERROR} />;
    }

    return children;
  }
}
export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
