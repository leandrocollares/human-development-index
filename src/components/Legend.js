import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Axis from './Axis';
import { actions, useStore } from '../store/useStore';

const width = 700;
const height = 60;

const minRange = 110;
const maxRange = 590;

const Legend = ({ colorScale }) => {
  const {
    state: { selectedIndexRange },
    dispatch,
  } = useStore();

  let [min, max] = selectedIndexRange;

  if (selectedIndexRange.length !== 0) {
    min = selectedIndexRange[0].toFixed(3);
    max = selectedIndexRange[1].toFixed(3);
  }

  const brushRef = useRef(null);

  const xScaleMin = d3.min(colorScale.domain());
  const xScaleMax = d3.max(colorScale.domain());
  const xScale = d3
    .scaleLinear()
    .domain([xScaleMin, xScaleMax])
    .rangeRound([minRange, maxRange]);

  const colorBands = colorScale.range().map((color) => {
    const d = colorScale.invertExtent(color);

    if (!d[0]) d[0] = xScale.domain()[0];
    if (!d[1]) d[1] = xScale.domain()[1];

    return d;
  });

  const brushed = () => {
    let bounds = null;

    if (d3.event.selection) {
      const [x1, x2] = d3.event.selection;
      bounds = [xScale.invert(x1), xScale.invert(x2)];

      dispatch({ type: actions.SET_HDI_RANGE, payload: bounds });
    }
  };

  const brushStarted = () => {
    const [x1, x2] = d3.event.selection;
    if (x1 === x2) {
      dispatch({ type: actions.RESET_HDI_RANGE });
    }
  };

  useEffect(() => {
    const brush = d3
      .brushX()
      .extent([
        [minRange, 0],
        [maxRange, height],
      ])
      .on('start', brushStarted)
      .on('brush', brushed);

    d3.select(brushRef.current).call(brush);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="legend">
      <div className="legend__range">
        {(selectedIndexRange.length !== 0)
          ? <span>{`HDI range: ${min} - ${max}`}</span>
          : (
            <span>
              HDI range: 0.100 - 1.000. Click and drag on the legend to select a new HDI range.
            </span>
          )}
      </div>
      <svg
        width={width}
        height={height}
      >
        <g>
          {colorBands.map((band) => (
            <rect
              key={band}
              x={xScale(band[0])}
              y={15}
              width={xScale(band[1]) - xScale(band[0])}
              height={15}
              fill={colorScale(band[0])}
            />
          ))}
          <Axis
            orientation="Bottom"
            scale={xScale}
            colorScale={colorScale}
            xTransform={0}
            yTransform={10}
            minAxisValue={0.1}
            maxAxisValue={1.0}
            className="legend__axis"
          />
          <g ref={brushRef} className="brush" />
        </g>
      </svg>
    </div>
  );
};

Legend.propTypes = {
  colorScale: PropTypes.func,
};

export default Legend;
