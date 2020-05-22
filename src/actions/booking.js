import axios from "utils/axios";
import toastr from "component/Toastr";

export function getBookings() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        url: "/admin/booking",
        method: "GET",
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.data) {
        dispatch({
          type: "SET_ALL_BOOKINGS",
          payload: request.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error("Fetch data failed!", "Error");
    }
  };
}
