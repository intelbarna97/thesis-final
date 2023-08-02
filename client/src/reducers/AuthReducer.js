const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "LOGOUT": {
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    }
    case "UPDATE_START":
      return { ...state, udpate: true, error: false };

    case "UPDATE_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, udpate: false, error: false };

    case "UPDATE_FAIL":
      return { ...state, udpate: false, error: true };

    case "FOLLOW_START":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };

    case "UNFOLLOW_START":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (id) => id !== action.data
              ),
            ],
          },
        },
      };

    default:
      return state;
  }
};

export default authReducer;
