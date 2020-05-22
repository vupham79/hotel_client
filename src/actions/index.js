import { loginAdmin, logoutAdmin } from "./admin";
import { getBookings } from "./booking";
import { closeLoading, showLoading } from "./spinner";
import {
  createHotel,
  deleteHotel,
  getHotels,
  editHotel,
  setSearchText,
} from "./hotel";
import { loginUser, logoutUser, getUsers, makeBooking } from "./user";
import {
  setNewHotelAvatar,
  setNewHotelPhotos,
  removeNewHotelPhoto,
  setSelectedHotelAvatar,
  removeSelectedHotelPhoto,
  setSelectedHotelPhotos,
  addSelectedHotelPhotos,
} from "./avatar";
export {
  showLoading,
  closeLoading,
  // Admin
  loginAdmin,
  logoutAdmin,
  //
  // Booking
  getBookings,
  //
  // User
  loginUser,
  logoutUser,
  getUsers,
  makeBooking,
  //
  // Hotel
  createHotel,
  deleteHotel,
  getHotels,
  editHotel,
  setSearchText,
  //
  // Avatar
  setNewHotelAvatar,
  setNewHotelPhotos,
  removeNewHotelPhoto,
  setSelectedHotelAvatar,
  removeSelectedHotelPhoto,
  setSelectedHotelPhotos,
  addSelectedHotelPhotos,
  //
};
