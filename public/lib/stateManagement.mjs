import { colors } from "./colors.mjs";
import { nextArrayIndex } from "./nextArrayIndex.mjs";

// const score = [
//   ["C3", "", 2000],
//   ["", "", 500],
//   ["G3", "", 2000],
//   ["", "", 500],
//   ["Bb3", "Eb3", 500],
//   ["", "", 500],
//   ["Eb3", "", 2000],
//   ["", "", 500],
//   ["Eb3", "C", 2000],
//   ["", "", 1000],
// ];

// const initialState = {
//   score,
//   scoreIndex: 0,
//   colors,
//   colorIndex: 0,
// };

export const createStore = (reducer, initialState) => {
  let state = initialState;
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
export const reducer = (state = {}, action) => {
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
