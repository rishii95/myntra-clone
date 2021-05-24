import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'antd';
import variables from '../../variables.module.scss';

export default function TextButton(props) {
  const {
    children, weight, color, size,
  } = props;
  const getStyles = () => ({ color, fontWeight: weight, fontSize: size });
  return (
    <Button data-testid="text-button" type="link" style={getStyles()}>{children}</Button>
  );
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  weight: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};

TextButton.defaultProps = {
  weight: variables.mediumFont,
  color: variables.pink,
  size: variables.subtitleSize,
};
