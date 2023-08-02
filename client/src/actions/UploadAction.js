import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (post) => async (dispatch) => {
  dispatch({ type: "UPLOAD_STARTED" });
  try {
    const newPost = await UploadApi.uploadPost(post);
    if (post.parent) {
      await UploadApi.updateComment(newPost.data._id, post.parent);
    }
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const uploadComment = (comment) => async (dispatch) => {
  dispatch({ type: "UPLOAD_COMMENT_STARTED" });
  try {
    const newComment = await UploadApi.uploadPost(comment);
    dispatch({ type: "UPLOAD_COMMENT_SUCCESS", commentData: newComment.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_COMMENT_FAIL" });
  }
};
