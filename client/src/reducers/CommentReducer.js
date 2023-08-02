const commentReducer = (
  state = {
    comments: [],
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_COMMENT_STARTED":
      return { ...state, uploading: true, error: false };

    case "UPLOAD_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [action.commentData, ...state.comments],
        uploading: false,
        error: false,
      };

    case "UPLOAD_COMMENT_FAIL":
      return { ...state, uploading: false, error: true };

    case "LOADING_COMMENT_START":
      return { ...state, loading: true, error: false };

    case "LOADING_COMMENT_SUCCESS":
      return {
        ...state,
        comments: action.commentData,
        loading: false,
        error: false,
      };

    case "LOADING_COMMENT_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default commentReducer;
