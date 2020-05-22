export function showLoading() {
  return (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
  };
}

export function closeLoading() {
  return (dispatch) => {
    dispatch({
      type: "HIDE_LOADING",
    });
  };
}
