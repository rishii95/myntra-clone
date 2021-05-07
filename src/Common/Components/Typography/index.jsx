import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography as TypographyAnt } from 'antd';

import variables from '../../variables.module.scss';

import TypographyStyles from './Typography.module.scss';

const { Title, Paragraph, Text } = TypographyAnt;

export default function Typography({
  children, type, color, weight, className, marginBottom,
}) {
  const getStyles = () => ({ marginBottom, color, fontWeight: weight });
  const getElement = () => {
    switch (type) {
      case 'title':
        return (
          <Title
            level={5}
            style={{ ...getStyles(), fontWeight: variables.boldFont }}
            className={className}
          >
            {children}
          </Title>
        );
      case 'subtitle':
        return (
          <Paragraph
            className={`${TypographyStyles.subtitle} ${className}`}
            style={getStyles()}
          >
            {children}
          </Paragraph>
        );
      case 'text':
        return (
          <Text
            className={`${TypographyStyles.text} ${className}`}
            style={getStyles()}
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
  type: PropTypes.oneOf(['title', 'text', 'subtitle']).isRequired,
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
