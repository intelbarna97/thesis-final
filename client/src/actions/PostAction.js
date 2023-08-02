import * as PostApi from "../api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "LOADING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "LOADING_FAILURE" });
    console.log(error);
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_START" });
  try {
    const { data } = await PostApi.getUserPosts(id);
    dispatch({ type: "LOADING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "LOADING_FAILURE" });
    console.log(error);
  }
};
