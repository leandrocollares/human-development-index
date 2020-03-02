import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ hovered, position, year }) => {
  if (!hovered && !position && !year) return null;

  return (
    <div
      className="tooltip"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <span className="tooltip__title">{hovered.properties.name}</span>
      <span>
        {Object.keys(hovered.hdi).length && hovered.hdi[year] !== '..'
          ? `HDI(${year}): ${hovered.hdi[year]}`
          : 'Data not available'}
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  hovered: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    properties: PropTypes.shape({
      name: PropTypes.string,
    }),
    geometry: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.array,
    }),
    hdi: PropTypes.object,
  }),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  year: PropTypes.number,
};

export default Tooltip;
