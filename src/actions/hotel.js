import axios from "utils/axios";
import toastr from "component/Toastr";
import { firebase } from "utils/firebase";

export function getHotels() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        url: "/hotel",
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.data) {
        dispatch({
          type: "SET_ALL_HOTELS",
          payload: request.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };
}

export function createHotel({ name, description, phoneNumber }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        url: "/hotel",
        method: "POST",
        data: { name, description, phoneNumber },
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.data) {
        console.log(request.data);
      }
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error("Create new hotel failed!", "Error");
    }
  };
}

export function editHotel({ hotel, photos, avatar }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const uploadAvatarAction = await uploadAvatar(avatar, hotel._id);
      if (uploadAvatarAction) {
        hotel.avatar = uploadAvatarAction;
      }
      const uploadPhotosAction = await uploadPhotos(photos, hotel._id);
      if (uploadPhotosAction) {
        hotel.photos = uploadPhotosAction;
      }
      await axios({
        url: `/hotel/${hotel._id}`,
        method: "PATCH",
        data: hotel,
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.success(`Updated ${hotel.name}!`, "Success");
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toastr.error(`Update ${hotel.name} failed!`, "Error");
    }
  };
}

export function deleteHotel({ _id, name }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const request = await axios({
        url: `/hotel/${_id}`,
        method: "DELETE",
      });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (request.data) {
        toastr.success(`Deleted ${name}!`, "Success");
      }
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };
}

export function uploadAvatar(avatar, hotelId) {
  return new Promise(async (resolve) => {
    try {
      if (typeof avatar === "string") {
        resolve(avatar);
      } else {
        await firebase
          .storage()
          .ref(hotelId)
          .child("avatar")
          .put(avatar, {
            contentType: "image/jpeg",
          })
          .then(async () => {
            await firebase
              .storage()
              .ref(hotelId)
              .child("avatar")
              .getDownloadURL()
              .then((url) => {
                resolve(url);
              });
          })
          .catch((error) => {
            console.log("upload: ", error);
            toastr.error(`Upload avatar failed`, "Error");
            resolve(false);
          });
      }
    } catch (error) {
      console.log(error);
      toastr.error(`Upload avatar failed`, "Error");
      resolve(false);
    }
  });
}

export function uploadPhotos(photos, hotelId) {
  return new Promise(async (resolve, reject) => {
    try {
      let photosUrl = [];
      if (photos && photos.length > 0) {
        // map array to promises
        const promises = photos.map(async (photo) => {
          if (typeof photo === "string") {
            photosUrl.push(photo);
          } else {
            await firebase
              .storage()
              .ref(hotelId)
              .child(`photos_${photo.name}`)
              .put(photo, {
                contentType: "image/jpeg",
              })
              .then(async () => {
                await firebase
                  .storage()
                  .ref(hotelId)
                  .child(`photos_${photo.name}`)
                  .getDownloadURL()
                  .then((url) => {
                    photosUrl.push(url);
                  });
              })
              .catch((error) => {
                console.log("upload: ", error);
                toastr.error(`Upload photo failed`, "Error");
                resolve(false);
              });
          }
        });
        // wait until all promises are resolved
        await Promise.all(promises);
        resolve(photosUrl);
      } else {
        resolve([]);
      }
    } catch (error) {
      toastr.error(`Upload photo failed`, "Error");
      resolve(false);
    }
  });
}

export function setSearchText(text) {
  return async (dispatch) => {
    dispatch({
      type: "SET_SEARCH_TEXT",
      payload: text,
    });
  };
}
