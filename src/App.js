import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import WorldMap from './components/WorldMap';
import Legend from './components/Legend';
import Throbber from './components/Throbber';
import YearSlider from './components/YearSlider';
import worldData from './data/worldData';
import hdiData from './data/hdi.csv';
import { StoreProvider } from './store/useStore';

const App = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    (async () => {
      const hdiDataRead = await d3.csv(hdiData);
      const hdi = {};

      hdiDataRead.forEach((item) => {
        hdi[item.id] = item;
      });

      worldData.features.forEach((feature, index) => {
        const countryId = feature.id;
        const hdiValues = hdi[countryId] || {};

        if ('id' in hdiValues && 'name' in hdiValues) {
          delete hdiValues.id;
          delete hdiValues.name;
        }

        worldData.features[index].hdi = hdiValues;
      });
      setMapData(worldData);
    })();
  }, []);

  const colorScale = d3
    .scaleThreshold()
    .domain([0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1])
    .range(d3.schemeBuPu[7]);

  return (
    <StoreProvider>
      <div className="app">
        <h1>
          {' '}
          <a href="http://hdr.undp.org/en/content/human-development-index-hdi" target="_blank" rel="noopener noreferrer">
            Human Development Index
          </a>
          {' '}
          (HDI)
        </h1>
        {mapData ? (
          <>
            <WorldMap data={mapData} colorScale={colorScale} />
            <Legend colorScale={colorScale} />
            <YearSlider minValue={1990} maxValue={2018} />
          </>
        ) : (
          <Throbber />
        )}
        <p className="app__footer">
          Source:
          {' '}
          <a href="http://hdr.undp.org/en/data" target="_blank" rel="noopener noreferrer">
            United Nations Development Programme
          </a>
          {' '}
          &middot; Data downloaded on 20 February 2020
        </p>
      </div>
    </StoreProvider>
  );
};

export default App;
