const defaultState = {
  newHotelAvatar: null,
  newHotelPhotos: [],
  selectedHotelAvatar: null,
  selectedHotelPhotos: [],
};

let img = null;
let filter = null;

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_NEW_HOTEL_AVATAR":
      return {
        ...state,
        newHotelAvatar: action.payload,
      };
    case "SET_NEW_HOTEL_PHOTOS":
      return {
        ...state,
        newHotelPhotos: [...state.newHotelPhotos, action.payload],
      };
    case "REMOVE_NEW_HOTEL_PHOTOS":
      img = action.payload;
      filter = state.newHotelPhotos.filter((photo) => {
        if (typeof img === "object") {
          return photo.name !== img.name;
        } else {
          return photo !== img;
        }
      });
      return {
        ...state,
        newHotelPhotos: [...filter],
      };
    case "SET_SELECTED_HOTEL_AVATAR":
      return { ...state, selectedHotelAvatar: action.payload };
    case "SET_SELECTED_HOTEL_PHOTOS":
      return {
        ...state,
        selectedHotelPhotos: [...action.payload],
      };
    case "ADD_SELECTED_HOTEL_PHOTOS":
      return {
        ...state,
        selectedHotelPhotos: [...state.selectedHotelPhotos, action.payload],
      };
    case "REMOVE_SELECTED_HOTEL_PHOTOS":
      img = action.payload;
      filter = state.selectedHotelPhotos.filter((photo) => {
        if (typeof img === "object") {
          return photo.name !== img.name;
        } else {
          return photo !== img;
        }
      });
      return {
        ...state,
        selectedHotelPhotos: [...filter],
      };
    default:
      return state;
  }
};
