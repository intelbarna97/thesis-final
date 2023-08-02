const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_STARTED":
      return { ...state, uploading: true, error: false };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    case "LOADING_START":
      return { ...state, loading: true, error: false };

    case "LOADING_SUCCESS":
      return {
        ...state,
        posts: action.data,
        loading: false,
        error: false,
      };

    case "LOADING_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default postReducer;
