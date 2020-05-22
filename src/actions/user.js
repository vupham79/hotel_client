import toastr from "../component/Toastr";
import axios from "utils/axios";

export function loginUser(user) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        method: "POST",
        url: "/user/login",
        data: user,
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.status === 200) {
        dispatch({
          type: "SET_LOGIN_USER",
          payload: user.email,
        });
        return true;
      }
      return false;
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

export function logoutUser() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    dispatch({
      type: "SET_LOGOUT_USER",
    });
    dispatch({
      type: "HIDE_LOADING",
    });
  };
}

export function getUsers() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        url: "/user",
        method: "GET",
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.data) {
        dispatch({
          type: "SET_USERS",
          payload: request.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error("Cannot get data!", "Error");
    }
  };
}

export function makeBooking({ hotelId, user }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      console.log(user);
      await axios({
        url: "/user/booking",
        method: "POST",
        data: {
          hotelId,
          user,
        },
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.success("Booking success!", "Success");
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error("Cannot get data!", "Error");
    }
  };
}
