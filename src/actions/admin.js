import toastr from "../component/Toastr";
// import axios from "../utils/axios";

export function loginAdmin({ username, password }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      // const data = await axios({
      //   method: "POST",
      //   url: "/admin/login",
      //   data: {
      //     username,
      //     password,
      //   },
      // });
      dispatch({
        type: "HIDE_LOADING",
      });
      // if (data.status === 200) {
      dispatch({
        type: "SET_LOGIN_ADMIN",
        payload: {
          username,
          password,
        },
      });
      //   return true;
      // } else {
      //   toastr.error(`Incorrect username or password`, "Error");
      // }
      // return false;
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error(`Login failed!`, "Error");
    } finally {
      return false;
    }
  };
}

export function logoutAdmin() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    dispatch({
      type: "SET_LOGOUT_ADMIN",
    });
    dispatch({
      type: "HIDE_LOADING",
    });
  };
}
