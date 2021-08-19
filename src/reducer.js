const defaultState = window.localStorage.getItem("Tajweed") || {};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // case 'INCREMENT':
    //   return ({lecture: state.lecture + 1})

    // case 'DECREMENT':
    //   return ({lecture: state.lecture - 1})

    // case 'SET':
    //   return ({lecture: action.value})

    case "SETPROGRESS":
      const current = JSON.parse(JSON.stringify(state));
      const { lecture, exercise, result } = action.payload;
      if (!current[lecture]) current[lecture] = {};
      if (!(current[lecture][exercise] > result))
        current[lecture][exercise] = result;
      return current;

    default:
      return state;
  }
};