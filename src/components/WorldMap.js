import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { geoEqualEarth, geoPath } from 'd3-geo';
import Country from './Country';
import Tooltip from './Tooltip';
import { useStore } from '../store/useStore';

const width = 900;
const height = 450;

const mediumGrey = '#d3d3d3';

const projection = geoEqualEarth()
  .scale(180)
  .rotate([352, 0, 0])
  .translate([width / 2, height / 1.8]);

const pathGenerator = geoPath().projection(projection);

const WorldMap = ({ data, colorScale }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const {
    state: { selectedIndexRange, selectedYear },
  } = useStore();

  useEffect(() => {
    if (selectedIndexRange.length) {
      const [min, max] = selectedIndexRange;
      const selected = data.features.filter(
        (country) => country.hdi[selectedYear] >= min && country.hdi[selectedYear] <= max,
      );

      setSelectedCountries(selected);
    } else {
      setSelectedCountries([]);
    }

    // eslint-disable-next-line
  }, [selectedIndexRange, selectedYear]);

  const colorCountry = (country) => {
    if (selectedIndexRange.length !== 0) {
      if (selectedCountries.find((item) => item.id === country.id)) {
        return colorScale(country.hdi[selectedYear]);
      }
      return mediumGrey;
    }
    if (country.hdi[selectedYear] !== '..') {
      return colorScale(country.hdi[selectedYear]);
    }
    return mediumGrey;
  };

  return (
    <div className="worldMap">
      <svg
        width={width}
        height={height}
      >
        <g>
          {data.features.map((country) => (
            <Country
              key={country.id}
              d={pathGenerator(country)}
              fill={colorCountry(country)}
              onMouseEnter={(event) => {
                setTooltipPosition({ x: event.pageX, y: event.pageY });
                setHoveredCountry(country);
              }}
              onMouseLeave={() => {
                setTooltipPosition(null);
                setHoveredCountry(null);
              }}
            />
          ))}
        </g>
      </svg>

      {tooltipPosition ? (
        <Tooltip
          hovered={hoveredCountry}
          position={tooltipPosition}
          year={selectedYear}
        />
      ) : null}
    </div>
  );
};

WorldMap.propTypes = {
  data: PropTypes.object,
  colorScale: PropTypes.func,
};

export default WorldMap;
