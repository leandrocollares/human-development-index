import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Axis = ({
  orientation, scale, colorScale, xTransform, yTransform, minAxisValue, maxAxisValue, className,
}) => {
  const axisRef = useRef(null);
  const darkGrey = '#333333';
  const xOffset = 5;
  const yTextCoordinate = '15';
  const yTextShift = '0.1em';

  useEffect(() => {
    d3.select(axisRef.current).call(
      d3[`axis${orientation}`](scale)
        .tickSize(25)
        .tickValues(colorScale.domain())
        .tickFormat(d3.format(',.3f')),
    );

    // eslint-disable-next-line
  }, []);

  return (
    <g
      ref={axisRef}
      transform={`translate(${xTransform}, ${yTransform})`}
      className={className}
    >
      <text
        x={`${scale(minAxisValue) - xOffset}`}
        y={yTextCoordinate}
        dy={yTextShift}
        textAnchor="end"
        fill={darkGrey}
      >
        lower development
      </text>
      <text
        x={`${scale(maxAxisValue) + xOffset}`}
        y={yTextCoordinate}
        dy={yTextShift}
        textAnchor="start"
        fill={darkGrey}
      >
        higher development
      </text>
    </g>

  );
};

Axis.propTypes = {
  orientation: PropTypes.string,
  scale: PropTypes.func,
  colorScale: PropTypes.func,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number,
  minAxisValue: PropTypes.number,
  maxAxisValue: PropTypes.number,
  className: PropTypes.string,
};

export default Axis;
