const defaultState = {
  email: null,
  isLogin: false,
  all: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return {
        ...state,
        email: action.payload,
        isLogin: true,
      };
    case "SET_LOGOUT_USER":
      return {
        ...defaultState,
      };
    case "SET_USERS":
      return {
        ...state,
        all: [...action.payload],
      };
    default:
      return state;
  }
};
