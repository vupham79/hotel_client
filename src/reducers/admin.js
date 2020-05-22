const defaultState = {
  isLogin: false,
  bookings: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN_ADMIN":
      return {
        ...state,
        isLogin: true,
      };
    case "SET_LOGOUT_ADMIN":
      return {
        ...defaultState,
      };
    case "SET_ALL_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
      };
    default:
      return state;
  }
};
