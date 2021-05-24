import React from 'react';
import { PropTypes } from 'prop-types';
import Typography from '../Typography';
import variables from '../../variables.module.scss';
import { TYPOGRAPHY_TYPES } from '../../constants';

export default function Price({ children, className }) {
  return (
    <Typography
      type={TYPOGRAPHY_TYPES.SUBTITLE}
      className={className}
      weight={variables.mediumFont}
    >
      {`Rs ${children}`}

    </Typography>
  );
}

Price.propTypes = {
  children: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Price.defaultProps = {
  className: '',
};
