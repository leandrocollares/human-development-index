# Human development index (HDI)

An interactive choropleth map that shows human development indices in the world. The visualization offers the following interaction possibilities:

* Moving the slider allows users to see how human development indices varied between 1990 and 2018.

* Hovering over a country causes a tooltip containing the HDI for the chosen year to be displayed.

* Users can select an HDI range by clicking and dragging on the legend. Countries whose indices fall within the said HDI range will be highlighted.

The visualization was implemented with [React](https://reactjs.org/) and [D3](https://d3js.org/). React renders visualization components, whereas D3 handles data and axis calculations. Thanks to React Hooks, only functional
components were employed. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Getting started

* Clone or download the repository 

* Navigate to the project directory: ```cd human-development-index```

* Install dependencies: ```npm install```

* Run the app in development mode: ```npm start```

Please refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for further information.

## Data source

[United Nations Development Programme](http://hdr.undp.org/en/data) &middot; Data downloaded on 20 February 2020.
