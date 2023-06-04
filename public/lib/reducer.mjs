// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COLOR_INDEX:
      // Return a new state object with the counter incremented
      return { ...state, colorIndex: state.colorIndex + 1 };
    default:
      return state;
  }
};
