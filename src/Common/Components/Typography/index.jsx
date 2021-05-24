/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography as TypographyAnt } from 'antd';

import variables from '../../variables.module.scss';

import TypographyStyles from './Typography.module.scss';
import { TYPOGRAPHY_TYPES } from '../../constants';

const { Title, Paragraph, Text } = TypographyAnt;

export default function Typography(props) {
  const {
    children, type, color, weight, className, marginBottom, ...rest
  } = props;
  const getStyles = () => ({ marginBottom, color, fontWeight: weight });
  const getElement = () => {
    switch (type) {
      case TYPOGRAPHY_TYPES.TITLE:
        return (
          <Title
            level={5}
            data-testid="typography-title"
            style={{ ...getStyles(), fontWeight: variables.boldFont }}
            className={className}
            {...rest}
          >
            {children}
          </Title>
        );
      case TYPOGRAPHY_TYPES.SUBTITLE:
        return (
          <Paragraph
            className={`${TypographyStyles.subtitle} ${className}`}
            style={getStyles()}
            data-testid="typography-subtitle"
            {...rest}
          >
            {children}
          </Paragraph>
        );
      case TYPOGRAPHY_TYPES.TEXT:
        return (
          <Text
            className={`${TypographyStyles.text} ${className}`}
            data-testid="typography-text"
            style={getStyles()}
            {...rest}
          >
            {children}
          </Text>
        );
      default:
        return null;
    }
  };

  return getElement();
}

Typography.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(TYPOGRAPHY_TYPES).isRequired,
  color: PropTypes.string,
  weight: PropTypes.string,
  className: PropTypes.string,
  marginBottom: PropTypes.number,
};

Typography.defaultProps = {
  color: variables.black,
  weight: variables.regularFont,
  className: '',
  marginBottom: 0,
};
