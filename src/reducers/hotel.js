const defaultState = {
  all: null,
  searchText: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_ALL_HOTELS":
      return {
        ...state,
        all: action.payload,
      };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
