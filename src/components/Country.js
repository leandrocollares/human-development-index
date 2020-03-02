import React from 'react';
import PropTypes from 'prop-types';

const Country = ({
  d, fill, onMouseEnter, onMouseLeave,
}) => (
  <path
    className="country"
    d={d}
    fill={fill}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

Country.propTypes = {
  d: PropTypes.string,
  fill: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Country;
