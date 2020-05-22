export function setNewHotelAvatar(avatar) {
  return (dispatch) => {
    dispatch({
      type: "SET_NEW_HOTEL_AVATAR",
      payload: avatar,
    });
  };
}

export function setNewHotelPhotos(photo) {
  return (dispatch) => {
    dispatch({
      type: "SET_NEW_HOTEL_PHOTOS",
      payload: photo,
    });
  };
}

export function removeNewHotelPhoto(photo) {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_NEW_HOTEL_PHOTOS",
      payload: photo,
    });
  };
}

export function setSelectedHotelAvatar(avatar) {
  return (dispatch) => {
    dispatch({
      type: "SET_SELECTED_HOTEL_AVATAR",
      payload: avatar,
    });
  };
}

export function setSelectedHotelPhotos(photos) {
  return (dispatch) => {
    dispatch({
      type: "SET_SELECTED_HOTEL_PHOTOS",
      payload: photos,
    });
  };
}

export function addSelectedHotelPhotos(photo) {
  return (dispatch) => {
    dispatch({
      type: "ADD_SELECTED_HOTEL_PHOTOS",
      payload: photo,
    });
  };
}

export function removeSelectedHotelPhoto(photo) {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_SELECTED_HOTEL_PHOTOS",
      payload: photo,
    });
  };
}
