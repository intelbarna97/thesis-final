import * as PostApi from "../api/PostRequest"

export const getComments = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_COMMENT_START" });
  try {
    const { data } = await PostApi.getComments(id);
    dispatch({ type: "LOADING_COMMENT_SUCCESS", commentData: data });
  } catch (error) {
    dispatch({ type: "LOADING_COMMENT_FAILURE" });
    console.log(error);
  }
};
