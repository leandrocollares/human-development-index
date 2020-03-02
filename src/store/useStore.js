import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

export const actions = {
  SET_HDI_RANGE: 'SET_HDI_RANGE',
  RESET_HDI_RANGE: 'RESET_HDI_RANGE',
  SET_YEAR: 'SET_YEAR',
};

const initialState = {
  selectedIndexRange: [],
  selectedYear: 2018,
};

const StoreContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_HDI_RANGE:
      return {
        ...state,
        selectedIndexRange: action.payload,
      };

    case actions.RESET_HDI_RANGE:
      return {
        ...state,
        selectedIndexRange: [],
      };

    case actions.SET_YEAR:
      return {
        ...state,
        selectedYear: action.payload,
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
