import { colors } from "./colors.mjs";
import { nextArrayIndex } from "./nextArrayIndex.mjs";

const score = [
  ["C2", "D2", 1000],
  ["", "", 1000],
  ["Cb2", "", 2000],
  ["", "F", 2000],
  ["D", "F", 3000],
  ["", "G", 3000],
];

const initialState = {
  score,
  scoreIndex: 0,
  colors,
  colorIndex: 0,
};

export const createStore = (reducer) => {
  let state;
  // let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    // listeners.forEach((listener) => listener());
  };

  // const subscribe = (listener) => {
  //   listeners.push(listener);
  //   return () => {
  //     listeners = listeners.filter((l) => l !== listener);
  //   };
  // };

  // Initialize the state
  dispatch({});

  return {
    getState,
    dispatch,
    // subscribe,
  };
};

// Reducer function
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COLOR_INDEX:
      // Return a new state object with the counter incremented
      return {
        ...state,
        colorIndex: nextArrayIndex(state.colorIndex, state.colors),
      };
    case INCREMENT_SCORE_INDEX:
      // Return a new state object with the counter incremented
      return {
        ...state,
        scoreIndex: nextArrayIndex(state.scoreIndex, state.score),
      };
    default:
      return state;
  }
};

// Action types
export const INCREMENT_COLOR_INDEX = "INCREMENT_COLOR_INDEX";
export const INCREMENT_SCORE_INDEX = "INCREMENT_SCORE_INDEX";

// Action creators
export const incrementColorIndex = () => ({ type: INCREMENT_COLOR_INDEX });
export const incrementScoreIndex = () => ({ type: INCREMENT_SCORE_INDEX });
