const defaultState = {
  isLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
