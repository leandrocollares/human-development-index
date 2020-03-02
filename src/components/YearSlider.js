import React from 'react';
import PropTypes from 'prop-types';
import { actions, useStore } from '../store/useStore';

const YearSlider = ({ minValue, maxValue }) => {
  const inputWidth = 400;
  const {
    state: { selectedYear },
    dispatch,
  } = useStore();

  return (
    <div className="slider">
      <div className="slider__label" style={{ center: inputWidth / 2 }}>
        <span className="slider__label__value">{selectedYear}</span>
      </div>
      <input
        type="range"
        value={selectedYear}
        min={minValue}
        max={maxValue}
        onChange={(event) => dispatch(
          { type: actions.SET_YEAR, payload: Number(event.target.value) })}
      />
      <div className="slider__minmax">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

YearSlider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default YearSlider;
