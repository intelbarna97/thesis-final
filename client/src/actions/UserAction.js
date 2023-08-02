import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATE_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_START", data: data });
  UserApi.followUser(id, data);
};

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_START", data: data });
  UserApi.unFollowUser(id, data);
};

export const getNofitications = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_NOTIFICATION_START" });
  try {
    const { data } = await UserApi.getNofitications(id);
    dispatch({ type: "LOADING_NOTIFICATION_SUCCESS", notificationData: data });
  } catch (error) {
    dispatch({ type: "LOADING_NOTIFICATION_FAILURE" });
  }
};
